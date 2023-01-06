const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = async client => {

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
	const commands = [];
	(await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async commandFile => {
		const command = require(commandFile)

		if (!command.help.name || !command.help.description) return console.log(`------------\nCommande boguée -> ${commandFile}\n------------`)
	
		commands.push(command.help)
		client.commands.set(command.help.name, command)
		console.log(`Discord command detected -> ${command.help.name}`)
	})
	
	try {
		console.log('Started refreshing application (/) commands.');
		
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD),
			{ body: commands },
		);
		
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}