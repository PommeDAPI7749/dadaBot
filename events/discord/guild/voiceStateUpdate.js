module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  async run(client, oldState, newState) {
    if (newState?.channelId == client.settings.get('voiceChannelMaker')) {
      await newState.guild.channels.create(`Vocal de ${newState.member.nickname ? newState.member.nickname : newState.member.user.username}`,
          {
            type: "GUILD_VOICE",
            parent: newState.channel.parentId
              ? newState.channel.parentId
              : null,
			  permissionOverwrites: [
          {
            id: newState.guild.roles.cache.find(r => r.name === '@everyone').id,
            deny: ['VIEW_CHANNEL']
          },
				  {
					  id: newState.member.id,
					  allow: ['MANAGE_CHANNELS', 'PRIORITY_SPEAKER', 'VIEW_CHANNEL', 'MUTE_MEMBERS']
				  }
			  ]
          }
        ).then((chan) => {
          newState.member.voice.setChannel(chan);
        });
    }
    if (oldState.channel?.parent.id === client.settings.get('voiceChannelsParent') 
      && oldState.channel?.id !== client.settings.get('voiceChannelMaker') 
      && oldState.channel?.members.size === 0
      && oldState.channel?.id !== '956997783095742484') {
      oldState.channel?.delete()
    }
  }
};
