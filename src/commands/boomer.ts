import {Message, MessageAttachment} from 'discord.js'
import Database from '../helpers/db'
import * as Canvas from 'canvas'

// Split text into new lines, each with a max length of 32
const splitLines = (line: string): string => { 
    const half = Math.round(line.length / 2)
    return line.length > 32 ? `${splitLines(line.substring(0, half))}\n${splitLines(line.substring(half, line.length))}` : line
}

// Return the input string, but with each character having a 50% chance to be lower case and a 50% chance to be upper case
const oKBoOmeR = (content: string) => content.replace(/\n\n/g, '').split('').map((char) => Math.round(Math.random()) ? char.toUpperCase() : char.toLowerCase()).join('')

module.exports = {
    name: 'boomer',
    description: 'MakE yOuR mEssAGe BeTteR',
    execute(message: Message, args: Array<string>, db: Database) {
        // Parse input
        const inputText = args.join(' ')

        // Transform input
        const boomerText = `${splitLines(oKBoOmeR(inputText))}\n... ok boomer`

        // Create canvas
        const canvas = Canvas.createCanvas(574, 548)
        const ctx = canvas.getContext('2d')

        // Constants used for text positioning
        const xPadding = 50 
        const yPadding = 50 + (boomerText.length > 10 ? 20 : 0)

        // Apply meme text in maximum size possible
        const applyText = (canvas: Canvas.Canvas, text: string) => {
            const ctx = canvas.getContext('2d')

            let fontSize = 1000
            do {
                ctx.font = `bold ${fontSize -= 1}px Impact`
            } while (ctx.measureText(text).width + xPadding > canvas.width )

            return ctx.font
        }

        Canvas.loadImage('./src/assets/spongebob-574-548.jpg').then((bg) => {
            // Add image to canvas
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

            // Add text
            ctx.font = applyText(canvas, boomerText) 
            ctx.fillStyle = '#ffffff'
            ctx.fillText(boomerText, xPadding, yPadding)
            ctx.fillStyle = 'black'
            ctx.strokeText(boomerText, xPadding, yPadding)

            // Send in discord
            const attachment = new MessageAttachment(canvas.toBuffer(), 'meme.png')
            message.channel.send(attachment)
        })
    }
}