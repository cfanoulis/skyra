import type { LanguageHelpDisplayOptions } from '#lib/i18n/LanguageHelp';
import { FT, T } from '#lib/types';

export const FollowageDescription = T<string>('commands/twitch:followageDescription');
export const FollowageExtended = T<LanguageHelpDisplayOptions>('commands/twitch:followageExtended');
export const TwitchDescription = T<string>('commands/twitch:twitchDescription');
export const TwitchExtended = T<LanguageHelpDisplayOptions>('commands/twitch:twitchExtended');
export const TwitchSubscriptionDescription = T<string>('commands/twitch:twitchSubscriptionDescription');
export const TwitchSubscriptionExtended = T<LanguageHelpDisplayOptions>('commands/twitch:twitchSubscriptionExtended');
export const Followage = FT<{ user: string; channel: string; time: number }, string>('commands/twitch:followage');
export const FollowageMissingEntries = T<string>('commands/twitch:followageMissingEntries');
export const TwitchNoEntries = T<string>('commands/twitch:twitchNoEntries');
export const TwitchTitles = T<{ followers: string; views: string; clickToVisit: string; partner: string }>('commands/twitch:twitchTitles');
export const TwitchPartnershipWithoutAffiliate = T<string>('commands/twitch:twitchPartnershipWithoutAffiliate');
export const TwitchAffiliateStatus = T<{ affiliated: string; partnered: string }>('commands/twitch:twitchAffiliateStatus');
export const TwitchSubscriptionStreamerNotFound = T<string>('commands/twitch:twitchSubscriptionStreamerNotFound');
export const TwitchSubscriptionStatusValues = T<[string, string]>('commands/twitch:twitchSubscriptionStatusValues');
export const TwitchSubscriptionInvalidStatus = T<string>('commands/twitch:twitchSubscriptionInvalidStatus');
export const TwitchSubscriptionAddDuplicated = T<string>('commands/twitch:twitchSubscriptionAddDuplicated');
export const TwitchSubscriptionAddSuccessOffline = FT<{ name: string; channel: string }, string>(
	'commands/twitch:twitchSubscriptionAddSuccessOffline'
);
export const TwitchSubscriptionAddSuccessLive = FT<{ name: string; channel: string }, string>('commands/twitch:twitchSubscriptionAddSuccessLive');
export const TwitchSubscriptionRemoveStreamerNotSubscribed = FT<{ streamer: string }, string>(
	'commands/twitch:twitchSubscriptionRemoveStreamerNotSubscribed'
);
export const TwitchSubscriptionRemoveNotToProvidedChannel = FT<{ channel: string }, string>(
	'commands/twitch:twitchSubscriptionRemoveNotToProvidedChannel'
);
export const TwitchSubscriptionRemoveStreamerStatusNotMatch = FT<{ streamer: string; status: string }, string>(
	'commands/twitch:twitchSubscriptionRemoveStreamerStatusNotMatch'
);
export const TwitchSubscriptionRemoveSuccessOffline = FT<{ name: string; channel: string }, string>(
	'commands/twitch:twitchSubscriptionRemoveSuccessOffline'
);
export const TwitchSubscriptionRemoveSuccessLive = FT<{ name: string; channel: string }, string>(
	'commands/twitch:twitchSubscriptionRemoveSuccessLive'
);
export const TwitchSubscriptionNoSubscriptions = T<string>('commands/twitch:twitchSubscriptionNoSubscriptions');
export const TwitchSubscriptionResetSuccess = FT<{ count: number }, string>('commands/twitch:twitchSubscriptionResetSuccess');
export const TwitchSubscriptionResetStreamerNotSubscribed = T<string>('commands/twitch:twitchSubscriptionResetStreamerNotSubscribed');
export const TwitchSubscriptionShowStreamerNotSubscribed = T<string>('commands/twitch:twitchSubscriptionShowStreamerNotSubscribed');
export const TwitchSubscriptionShowStatus = T<{ live: string; offline: string }>('commands/twitch:twitchSubscriptionShowStatus');
export const TwitchSubscriptionShowEmpty = T<string>('commands/twitch:twitchSubscriptionShowEmpty');
export const TwitchSubscriptionShowUnknownUser = T<string>('commands/twitch:twitchSubscriptionShowUnknownUser');
