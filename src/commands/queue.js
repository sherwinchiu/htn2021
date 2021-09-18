const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

let {queue} = require("./../data/musicQueue");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Adds a song to the queue')
        .addStringOption(option => option.setName('song').setDescription('Enter a song name')),
	async execute(interaction, client) {
        if (interaction.options.getString("song") === null) {
            const embed = new MessageEmbed();
            embed.setColor("AQUA");
            embed.setTitle("Your Queue");
            let foundChannel = false;
            for (const channel of queue) {
                if (channel.channelId === interaction.guild_id) {
                    foundChannel = true;
                    for (const song of channel.channelQueue) {
                        embed.addField(`${song.name}`, "song description...?");
                    }
                }
            }
            await interaction.reply({ embeds: [embed] });
        } else {
            // console.log(interaction.guild_id);
            let foundChannel = false;
            for (const channel of queue) {
                if (channel.channelId === interaction.guild_id) {
                    channel.channelQueue.push({name: interaction.options.getString("song")})
                    foundChannel = true;
                }
            }
            if (!foundChannel) {
                queue.push({channelId: interaction.guild_id, channelQueue: [{name: interaction.options.getString("song")}]})
            }
            await interaction.reply(`${interaction.options.getString("song")} has been added to the queue!`);
        }
	},
};
