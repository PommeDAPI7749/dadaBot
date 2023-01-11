module.exports = {
    help: {
      name: 'desinscription',
      description: 'Desinscrit une equipe',
      options: [
            {
              name: 'nom-de-l-equipe',
              description: 'inserez le nom de votre equipe',
              type: 3,
              required: true
            }
        ],
    },
    async runSlash(client, interaction) {
        const options = interaction.options
        const teamName = options.getString('nom-de-l-equipe')

        if (!client.inscriptionsTournois.has(teamName)) return interaction.reply({ content: 'Je ne trouve pas cette equipe. Veuillez verifier votre saisie', ephemeral: true });
        
        const equipe = client.inscriptionsTournois.get(teamName)
        const staff = ['233554558775853056', '742701288839577630', '231737942513549312', '212320709437816833', '194857392498802689', '278875281140350976', '539510339713105950']
        if ((equipe.coach ? equipe.coach !== interaction.member.id : !equipe.members.includes(interaction.member.id)) && !staff.includes(interaction.member.id)) return interaction.reply({ content: 'Seul' + ( equipe.coach ? ' ' + await interaction.guild.members.cache.get(equipe.coach).user.tag + ' peut' : 's les membres de l\'equipe peuvent' ) + ' supprimer cette equipe', ephemeral: true  })


        await interaction.guild.roles.delete(equipe.roleId)
        for (let memberId of equipe.members) {
            interaction.guild.members.cache.get(memberId).roles.remove('1060584230117183628')
        }
        interaction.guild.members.cache.get(equipe.coach)?.roles.remove('1060584230117183628')

        for (let channelId of equipe.channels) {
            await interaction.guild.channels.delete(channelId)
        }
        
        client.inscriptionsTournois.delete(teamName)

        client.emit('desinscriptionDetected', { name: teamName})

        interaction.reply({ content: 'Equipe desinscrite avec succes', ephemeral: true })
    }
  }