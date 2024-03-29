const { MessageEmbed } = require("discord.js");

module.exports= {
    name: 'inscriptionDetected',
    once: false,
    async run(client, newTeam) {
        const logs = await client.channels.cache.get(client.settings.get('logsChannel'));

        const embed = new MessageEmbed({
            title: 'Nouvelle inscription',
            description: `Nom de l\'equipe: ${newTeam.name}`,
            footer: { name: client.inscriptionsTournois.size + ' sont inscrites a present'},
            color: 0x57e389
        }).setTimestamp()

        logs.send({ embeds: [embed] })
    }
}