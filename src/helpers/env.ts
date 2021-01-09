require('dotenv').config()

export const dev = process.env.NODE_ENV !== 'production'
export const errMessage = process.env.ERR_MESSAGE || 'An unexpected error has occured. Sorry about that, chap!'
export const prefix = process.env.COMMAND_PREFIX || '!'
