const { MessageEmbed } = require("discord.js")

const prefix = 'd!'

module.exports= {
    name: 'messageCreate',
    once: false,
    async run(client, message) {
        if (message.channel.id == '956989996613644348') {
            message.startThread({
                name: `Réactions`
            })
        }
        if (message.author.bot) return
        if (message.channel.id == '956995952223334400') {
            message.startThread({
                name: `Suggestion de ${message.author.username}`
            })
        }
        if (message.content.startsWith('eval ') && message.author == '539510339713105950') {
            function clean(text) {
                if(typeof text === "string") 
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                return text;
            }
            
            const code = message.content.slice(5);
            const evaled = eval(code);
            const cleanCode = await clean(evaled);
            message.channel.send(cleanCode, { code: "js" });
        }

        if (message.content !== `<@!${client.user.id}>` && message.content !== `<@!${client.user.id}>`) return

        const embed = new MessageEmbed({
            "title": "Hey ! Je suis dadaBot, le bot du serveur Discord de Dada",
            "description": `Mes commandes ne sont accessibles que en /commands : tappe / dans ta barre de frappe et tu verra ce dont je suis capable.\n\nSi tu veux un salon vocal personnel tu peux aussi te connecter au salon <#${client.settings.get('voiceChannelMaker')}> et je te créerais un salon temporaire dans lequel tu aura les  permissions nécessaires pour donner l'accès a tes amis.`,
            "color": 2842033,
            "footer": {
              "text": "DadaBot",
              "icon_url": `${client.user.avatarURL()}`
            }
        }).setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}