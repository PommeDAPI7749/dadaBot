const { MessageEmbed, MessageAttachment } = require("discord.js");
const { readdirSync } = require('fs')

module.exports = {
    name: 'live',
    async run(client, channel, streamData) {
        const imageExist = await readdirSync('./utils/images/').filter(files => files.endsWith(`${streamData.game.toUpperCase()}.png`));
        var gameImg = imageExist[0] != undefined ? `./utils/images/${streamData.game.toUpperCase()}.png` : './utils/images/DEFAULT.png' ;
        gameImg = new MessageAttachment(gameImg, 'gameImage.png')

        const embed = await new MessageEmbed({
            "title": "Hey ! Dada est en live !",
            "description": "Vous pouvez le rejoindre en cliquant sur le lien ci-dessus.",
            "url": "https://www.twitch.tv/dadatv__",
            "color": 2842032,
            "fields": [
              {
                "name": "Titre du live",
                "value": streamData.title
              },
              {
                "name": "Jeu",
                "value": streamData.game,
                "inline": true
              },
              {
                "name": "Viewers",
                "value": String(streamData.viewers),
                "inline": true
              }
            ]
        }).setImage('attachment://gameImage.png')
        .setThumbnail(streamData.profile)
        .setTimestamp(streamData.raw.started_at)

        client.settings.set('status', 'live')
        await client.channels.cache.get(client.settings.get('notifsChannel')).send({content: '@everyone', embeds: [embed], files: [gameImg]}).then(message => {
            client.settings.set('notifsMessage', message.id)
        })
    }
}