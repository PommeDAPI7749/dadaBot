const { Client } = require('twitchrequest');
const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => {
    // Events chat / messages deletion ...
    const channel = new Client({
        channels: ['dadatv__'],
        client_id: process.env.twitchAppId,
        client_secret: process.env.twitchSecret,
        interval: 3
    });
    (await pGlob(`${process.cwd()}/events/twitch/*.js`)).map(async eventFile => {
        const event = require(eventFile)

        if (!event.name) {
            console.log(`------------\nEvenement twitch bogué -> ${eventFile}\n------------`)
        }

        channel.on(event.name, (...args) => event.run(client, channel, ...args))

        console.log(`Twitch event ready -> ${event.name}`)
    })

    console.log('------------\nTwitch integration is ready !\n------------\n')
}