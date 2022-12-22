const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async commandFile => {
        const command = require(commandFile)
        client.commands.set(command.name, command)

        if (!command.name || !command.description) return console.log(`------------\nCommande boguée -> ${commandFile}\n------------`)
        
        console.log(`Discord command ready -> ${command.name}`)
    })
}