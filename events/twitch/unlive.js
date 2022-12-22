const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'unlive',
    async run(client, channel, streamData) {
        client.settings.set('status', 'offline')
        client.channels.cache.get(client.settings.get('notifsChannel')).messages.cache.get(client.settings.get('notifsMessage'))?.edit({embed: [
            new MessageEmbed({
                'title': 'Live terminé',
                'color': '#ff0000'
            })
        ]})
    }
}