module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async run(client, member) {
        if (member.user.bot) return
        const guild = member.guild
        const role = await guild.roles.cache.get(client.settings.get('roleMembre'))
        member.roles.add(role)
    }
}