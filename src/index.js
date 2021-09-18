const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Collection();

client.once('ready', () => {
    console.log('Ready!');
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    let commands;
    if (guild) {
        commands = guild.commands;
    }
    const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
        commands?.create(command.data);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);