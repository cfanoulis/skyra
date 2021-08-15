import { TwitchEventSubVerificationMessage, TwitchSubscriptionTypes } from '#lib/types';
import { TwitchStreamStatus } from '#lib/types/AnalyticsSchema';
import { Events } from '#lib/types/Enums';
import { ApplyOptions } from '@sapphire/decorators';
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from '@sapphire/plugin-api';
import { isObject } from '@sapphire/utilities';

@ApplyOptions<RouteOptions>({ route: 'twitch/event_sub_verify' })
export class UserRoute extends Route {
	private lastNotificationId: string | null = null;

	// Stream Changed
	public [methods.POST](request: ApiRequest, response: ApiResponse) {
		console.time('request_timer');
		// Grab the headers that we need to use for verification
		const twitchEventSubMessageSignature = request.headers['twitch-eventsub-message-signature'];
		const twitchEventSubMessageId = request.headers['twitch-eventsub-message-id'];
		const twitchEventSubMessageTimestamp = request.headers['twitch-eventsub-message-timestamp'];

		// If this notification is the same as before, then send ok back
		if (this.lastNotificationId && this.lastNotificationId === twitchEventSubMessageId) return response.ok();

		// If there is no body then tell Twitch they are sending malformed data
		if (!isObject(request.body)) return response.badRequest('Malformed data received');

		// If any of the headers is missing tell Twitch they are sending invalid data
		if (!twitchEventSubMessageSignature || !twitchEventSubMessageId || !twitchEventSubMessageTimestamp) {
			return response.badRequest('Missing required Twitch Eventsub headers');
		}

		// Construct the verification signature
		const twitchEventSubMessage = twitchEventSubMessageId + twitchEventSubMessageTimestamp + JSON.stringify(request.body);

		// Split the algorithm from the signature
		const [algorithm, signature] = twitchEventSubMessageSignature.toString().split('=', 2);

		const { client } = this.container;

		// Verify the signature
		if (!client.twitch.checkSignature(algorithm, signature, twitchEventSubMessage)) {
			return response.forbidden('Invalid Hub signature');
		}

		// Tell the Twitch API this response was OK, then continue processing the request
		response.text((request.body as TwitchEventSubVerificationMessage).challenge);
		console.timeEnd('request_timer');

		// Destructure the properties that we need from the body
		const {
			subscription: { type },
			event
		} = request.body as TwitchEventSubVerificationMessage;

		// If there is an event then this is an online or offline notification
		// If there is no event this is an endpoint verification request
		if (event) {
			if (type === TwitchSubscriptionTypes.StreamOnline) {
				client.emit(Events.TwitchStreamHookedAnalytics, TwitchStreamStatus.Online);
				client.emit(Events.TwitchStreamOnline, event, response);
			} else {
				client.emit(Events.TwitchStreamHookedAnalytics, TwitchStreamStatus.Offline);
				client.emit(Events.TwitchStreamOffline, event, response);
			}
		}

		// Store the last notification id
		this.lastNotificationId = twitchEventSubMessageId;
	}
}

declare module 'http' {
	interface IncomingHttpHeaders extends NodeJS.Dict<string | string[]> {
		'twitch-eventsub-message-signature'?: string;
		'twitch-eventsub-message-id'?: string;
		'twitch-eventsub-message-timestamp'?: string;
	}
}
