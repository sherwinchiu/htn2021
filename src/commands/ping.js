const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with <name> is Cool!')
        .addStringOption(option => option.setName('name').setDescription('Enter a name')),
	async execute(interaction) {
		await interaction.reply(`${interaction.options.getString("name")} is Cool!`);
	},
};
