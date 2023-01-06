module.exports = {
    help: {
      name: 'inscription',
      description: 'Run un code donné',
      options: [
          {
              name: 'nom-de-l-equipe',
              description: 'inserez le nom de votre equipe',
              type: 3,
              required: true
          },
          {
              name: 'joueur-un',
              description: 'mentionnez le premier joueur',
              type: 6,
              required: true
          },
          {
              name: 'joueur-deux',
              description: 'mentionnez le deuxieme joueur',
              type: 6,
              required: true
          },
          {
              name: 'joueur-trois',
              description: 'mentionnez le troisieme joueur',
              type: 6,
              required: true
          },
          {
              name: 'joueur-quatre',
              description: 'mentionnez le quatrieme joueur',
              type: 6,
              required: true
          },
          {
              name: 'joueur-cinq',
              description: 'mentionnez le cinquieme joueur',
              type: 6,
              required: true
          },
          {
              name: 'coach',
              description: 'mentionnez le coach (facultatif)',
              type: 6,
              required: false
          },
      ],
    },
    async runSlash(client, interaction) {
      if (client.inscriptionsTournois.size > 8) {
        interaction.reply({ content: "Il n'est plus possible de vous inscrire car 9 equipes le sont deja", ephemeral: true })
        return
      }
      
      const options = interaction.options
      const teamMembers = []
      const dataTeam = {
        name: options.getString('nom-de-l-equipe'),
        body: {
          numeroDInscription: client.inscriptionsTournois.size,
          members: [],
          coach: options.getUser('coach')?.id
        }
      }

      if (client.inscriptionsTournois.has(options.getString('nom-de-l-equipe'))) {
        interaction.reply({ content: "Une equipe est deja inscrite a ce nom", ephemeral: true })
        return
      }
      
      teamMembers.push(options.getUser('joueur-un').id)
      teamMembers.push(options.getUser('joueur-deux').id)
      teamMembers.push(options.getUser('joueur-trois').id)
      teamMembers.push(options.getUser('joueur-quatre').id)
      teamMembers.push(options.getUser('joueur-cinq').id)

      for ( member of teamMembers ) {
        if (dataTeam.body.members.includes(member)) {
          interaction.reply({ content: 'Vous devez renseigner 5 joueurs differents', ephemeral: true})
          return
        }
        client.inscriptionsTournois.forEach((val, key) => {
          if (val.members.includes(member) || val.coach == member) {
            interaction.reply({ content: client.users.cache.get(member).tag + ' est deja inscrit dans une equipe', ephemeral: true})
            return
          }
        });
        dataTeam.body.members.push(member)
      }

      if (!dataTeam.body.members.includes(interaction.member.id) && dataTeam.body.coach !== interaction.member.id) {
        interaction.reply({ content: 'Vous ne pouvez pas inscrire une equipe dont vous ne faites pas parti', ephemeral: true })
        return
      }

      client.inscriptionsTournois.set(dataTeam.name, dataTeam.body)

      client.emit('inscriptionDetected', dataTeam)

      interaction.reply({ content: 'Equipe inscrite avec succes', ephemeral: true })
      if (client.inscriptionsTournois.size == 8) {
        interaction.editReply({ content: "Vous etes la neuvieme equipe a vous inscrire, vous ne serez donc appeles que si une equipe se desiste", ephemeral: true })
      }
    }
  }