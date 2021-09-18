const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('/pause (song name/url)'),
	async execute(interaction, client) {
		if (client.voice.adapters.length > 0) {
			interaction.reply("Being used somewhere else");
		} 
		else {
			 if (interaction.member.voice.channel) {
				
				await interaction.reply('**Pausing** (song name/song url)');
			} else {
				await interaction.reply("Please join a voice channel first");
			}
		}
    }
};
