const { Client, Intents, Collection, Interaction } = require("discord.js") 
const botConfig = require("./botConfig.json")                             
const fs = require("fs");
const discord = require("discord.js")
require("dotenv").config();

const prefix = botConfig.prefix

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();
client.aliases = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    command.help.aliases.forEach(alias => {
        client.aliases.set(alias, command.help.name);
    })

    console.log(`${command.help.name}.js has loaded.`);

}


client.once("ready", async () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity(`Discord.JS bot example!`, { type: "PLAYING" }); //The Discord "status" of the bot.

});

client.on("messageCreate", async message => { //Runs the handler when a message is sent.

    if (message.author.bot) return; //if the message is a bot, it stops the code.

    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === 'BOT_ID_HERE) return message.channel.send(`The server prefix is: ${prefix}`) // Sends a msg saying what the prefix is, when the bot is mentioned.
    }

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("There was a problem handling the command."); //If an error occurs in the handler code, it catches the error and sends a msg.
    }

});

client.login(botConfig.token)
