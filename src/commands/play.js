const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection,joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('/play (song name/song url)')
		.addStringOption(option => option.setName('song').setDescription('Enter a song name')),
	async execute(interaction, client) {
		if (client.voice.adapters.length > 0) {
			interaction.reply("Being used somewhere else");
		} else {
			if (`${interaction.options.getString("song")}` === 'null') {
				await interaction.reply ('Please put in the song you want to play'); // later to be changed to start playing if paused
			} else if (interaction.member.voice.channel) {
				joinVoiceChannel({
					channelId: interaction.member.voice.channel.id,
					guildId: interaction.member.guild.id,
					adapterCreator: interaction.guild.voiceAdapterCreator,
				});
				await interaction.reply('**Playing** (song name/song url)');
			} else {
				await interaction.reply("Please join a voice channel first");
			}
		}
	},
};
