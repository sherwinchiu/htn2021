const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

		console.log('Successfully registered application commands.');
        console.log(rest.commands);
	} catch (error) {
		console.error(error);
	}
})();
