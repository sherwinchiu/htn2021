const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
let {queue} = require("./../data/musicQueue");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Kicks bot from the voice channel and deletes the queue'),
	async execute(interaction, client) {
        const connection = getVoiceConnection(interaction.member.guild.id);
        console.log(connection)
        await connection.destroy();
        for (const channel of queue) {
            if (channel.channelId === interaction.member.guild.id) {
                const index = queue.indexOf(channel);
                if (index > -1) {
                    queue.splice(index, 1);
                }
            }
        }
        await interaction.reply("Disconnected");
	},
};
