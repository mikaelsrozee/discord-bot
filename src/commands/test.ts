import {Message} from 'discord.js'

module.exports = {
    name: 'test',
    description: 'Woo!',
    execute(message: Message, args: Array<string>) {
        message.channel.send('Polo!')
    }
}