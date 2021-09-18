const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('/play (song name/song url)'),
	async execute(interaction) {
		await interaction.reply('**Playing** (song name/song url)');
	},
};
