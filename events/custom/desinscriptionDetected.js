const { MessageEmbed } = require("discord.js");

module.exports= {
    name: 'desinscriptionDetected',
    once: false,
    async run(client, newTeam) {
        const logs = await client.channels.cache.get(client.settings.get('logsChannel'));

        const embed = new MessageEmbed({
            title: 'Desinscription detectee',
            description: `Nom de l\'equipe: ${newTeam.name}`,
            footer: { name: client.inscriptionsTournois.size + ' sont inscrites a present'},
            color: 0xed333b
        }).setTimestamp()

        logs.send({ embeds: [embed] })
    }
}