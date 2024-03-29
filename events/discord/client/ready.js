module.exports = {
    name: 'ready',
    once: true,
    async run(client) {
        console.log('------------\nDiscord integration is ready !\n------------\n')

        const devGuild = await client.guilds.cache.get(process.env.GUILD)
        devGuild.commands.set(client.commands.map(command => command.help))
    }
}