const dotenv = require('dotenv'); dotenv.config()

// Discord 
const { Client, Collection } = require('discord.js')
const client = new Client({ restRequestTimeout: 60000, intents: 69631 })
client.commands = new Collection()

const handlers = ['EventUtil', 'CommandUtil']
handlers.forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

// DB
const Enmap = require("enmap");

client.settings = new Enmap({ name: "settings",  fetchAll: true, autoFetch: true });
client.settings.ensure('guildId', '694968857684869280')
client.settings.ensure('voiceChannelMaker', '959807850387996732')
client.settings.ensure('voiceChannelsParent', '956996907882909757')
client.settings.ensure('notifsChannel', '1043875401358917672')
client.settings.ensure('logsChannel', '959822164448665680')
client.settings.ensure('roleMembre', '959478238911037571')
client.settings.ensure('notifsMessage', '')
client.settings.set('status', 'offline')

client.inscriptionsTournois = new Enmap({ name: "inscriptionsTournois",  fetchAll: true, autoFetch: true });
client.inscriptionsTournois.clear()

// API Twitch
require("./utils/twitch/main")(client)

// Traitement des erreurs
process.on('exit', code => console.log(`process stopped with : ${code}`))
process.on('uncaughtExeption', (err, origin) => console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origin: ${origin}`))
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDELED_REJECTION: ${reason}\n------------\n`, promise) })
process.on('warning', (...args) => console.log(...args))

client.login(process.env.TOKEN)