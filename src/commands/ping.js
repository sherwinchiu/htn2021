const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Vivian is Cool!'),
	async execute(interaction) {
		await interaction.reply('Vivian is Cool!');
	},
};
