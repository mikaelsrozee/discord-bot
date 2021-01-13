import {Message} from 'discord.js'
import {errMessage, prefix, dev} from './helpers/env'
import {readdirSync} from 'fs'
import Database from './helpers/db'

// Create local database
const db = new Database()

interface Command {
    name: string,
    description: string,
    execute: Function,
}

const commands = new Map<string, Command>() 

function initCommands() {
    const commandFiles = readdirSync('./out/commands').filter((file) => file.endsWith('.js'))

    commandFiles.forEach((file) => {
        const command:Command = require(`./commands/${file}`)

        commands.set(command.name, command)
    })
}

export function processMessage(message: Message) {
    // Ignore wrongly prefixed messages and messages from this bot
    if (!message.content.startsWith(prefix) || message.author.bot) return

    // Split args from key 
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const key = args.shift()?.toLowerCase() || ''

    // Resolve function
    const fn = commands.get(key)?.execute || (() => {if (dev) message.reply(errMessage)})

    // Run
    fn(message, args, db)
}

initCommands()
