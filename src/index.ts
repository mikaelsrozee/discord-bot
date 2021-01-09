import {Client} from 'discord.js'
import Database from './helpers/db'
import {processMessage} from './commandHandler'

// Create Discord client, create commands map
const client:Client = new Client()

// Create local database
const db = new Database()

function addEventListeners() {
    client.on('message', processMessage)
}

addEventListeners()

client.login(process.env.BOT_TOKEN)
