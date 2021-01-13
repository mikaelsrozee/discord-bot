import {Client} from 'discord.js'
import {processMessage} from './commandHandler'
import express from 'express'

const app = express()

require('dotenv').config()

// Create Discord client, create commands map
const client:Client = new Client()

function addEventListeners() {
    client.on('message', processMessage)
}

addEventListeners()

client.login(process.env.BOT_TOKEN)

app.get('/', (_, res) => res.sendStatus(200))

app.listen(process.env.PORT || 8080)