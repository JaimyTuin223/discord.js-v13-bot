module.exports.run = async (client, message, args) => {

    return message.channel.send(`🏓 Bot latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

}

module.exports.help = {
    name: "ping",
    category: "general",  /* general, information, moderation or testing - if set to invalid category, it won't display. */
    description: "Check the bots latency.",
    aliases: []
}