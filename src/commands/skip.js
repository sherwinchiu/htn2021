const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
let {queue} = require("./../data/musicQueue");


const dispatcher = queue
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('/skip (skipping song name/url), skips current song and moves to next song in queue. Fails if there is no queue'),
	async execute(interaction, client) {

	},
};
