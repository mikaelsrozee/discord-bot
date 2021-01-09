import {Message, Emoji} from 'discord.js'
import {dev, errMessage, prefix} from './helpers/env'
import {readdirSync} from 'fs'

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

    // Split args from 
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const key = args.shift()?.toLowerCase() || ''

    const fn = commands.get(key)?.execute || (() => message.reply(errMessage))

    fn(message)
}

initCommands()
