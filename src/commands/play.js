const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');
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
				let song;
				if (ytdl.validateURL(interaction.options.getString("song"))) {
					const songInfo = await ytdl.getInfo(interaction.options.getString("song"));
					song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url}
				} else {
					const videoFinder = async(query) => {
						const videoResult = await ytSearch(query);
						return (videoResult.videos.length > 1) ? videoResult.videos[0]: null;
					}
					const video = await videoFinder(interaction.options.getString("song"));
					if (video) {
						song = {title: video.title, url: video.url}
					} else {
						await interaction.reply("Something broke");
					}
				}
				const player = createAudioPlayer();
				const resource = createAudioResource(ytdl(song.url, {filter: 'audioonly'}));
				player.play(resource);
				await interaction.reply(`**Playing** ${interaction.options.getString("song")}`);
			} else {
				await interaction.reply("Please join a voice channel first");
			}
		}
	},
};
