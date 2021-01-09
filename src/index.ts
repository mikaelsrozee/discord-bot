import {Client} from 'discord.js'
import {processMessage} from './commandHandler'

// Create Discord client, create commands map
const client:Client = new Client()

function addEventListeners() {
    client.on('message', processMessage)
}

addEventListeners()

client.login(process.env.BOT_TOKEN)