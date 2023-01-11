const { MessageEmbed } = require("discord.js")

module.exports = {
    help: {
      name: 'equipes',
      description: 'Affiche la liste des equipes inscrites',
    },
    async runSlash(client, interaction) {
        const staff = ['233554558775853056', '742701288839577630', '231737942513549312', '212320709437816833', '194857392498802689', '278875281140350976', '539510339713105950']
        if (!staff.includes(interaction.member.id)) return interaction.reply({ content: 'Le staff peut executer cette commande', ephemeral: true  })

        const embed = new MessageEmbed({
            title: client.inscriptionsTournois.size == 0 ? 'Aucune equipe ne s\'est inscrite pour le moment ...' : 'Voici la liste des equipes inscrites'
        }).setTimestamp()

        for (let [teamName, teamData] of client.inscriptionsTournois) {
            let data = 'Numero d\'inscription: ' + (teamData.numeroDInscription + 1) + '\nJoueurs:'

            for (let memberId of teamData.members) {
                data += '\n  - ' + await interaction.guild.members.cache.get(memberId).user.username
            }

            teamData.coach ? data += '\nCoach: ' + interaction.guild.members.cache.get(teamData.coach).user.username : data += ''

            embed.addFields([
                {
                    name: teamName,
                    value: data
                }
            ])
        }

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
  }