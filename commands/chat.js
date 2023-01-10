const { request } = require('undici'); //https://apiv2.spapi.ga/misc/clever?text=$url[encode;$message]&key=$getVar[B5TRDuhCnS]

module.exports.run = async (client, message, args) => {

        const result = await request('https://apiv2.spapi.ga/misc/clever?text=$url[encode;$message]&key=$getVar[B5TRDuhCnS]');
        const { data } = await result.body.json()
        
        message.channel.send(`${data}`)

}

module.exports.help = {
    name: "chat",
    category: "general",  /* general, information, moderation or testing - if set to invalid category, it won't display. */
    description: "Chat!",
    aliases: []
}