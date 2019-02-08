import { MessageEmbed } from 'discord.js';
import { CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { SkyraCommand } from '../../lib/structures/SkyraCommand';
import { fetch, getColor } from '../../lib/util/util';

export default class extends SkyraCommand {

	public constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			aliases: ['kittenfact'],
			cooldown: 10,
			description: (language) => language.get('COMMAND_CATFACT_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_CATFACT_EXTENDED'),
			requiredPermissions: ['EMBED_LINKS']
		});
		this.spam = true;
	}

	public async run(message: KlasaMessage) {
		const { fact } = await fetch('https://catfact.ninja/fact', 'json');
		return message.sendEmbed(new MessageEmbed()
			.setColor(getColor(message) || 0xFFAB2D)
			.setTitle(message.language.get('COMMAND_CATFACT_TITLE'))
			.setDescription(fact));
	}

}
