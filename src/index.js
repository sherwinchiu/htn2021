const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

// client.on('interactionCreate', async interaction => {
// 	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
// 	if (!interaction.isCommand()) return;

// 	const { commandName } = interaction;

// 	if (commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	} else if (commandName === 'server') {
// 		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
// 	} else if (commandName === 'user') {
// 		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
// 	}
// })

// client.on('interactionCreate', async interaction => {
// 	console.log(interaction)
// 	if (!interaction.isCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	}
// });

// client.on("messageCreate", message => {
//     console.log(message);
// });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);