const TelegramBot = require('node-telegram-bot-api')
const TOKEN = `2001354008:AAHpSlDCVcDFNMRmX0QurW1qVDeq7bOf-D4`

const bot = new TelegramBot(TOKEN, {
    polling: true
})

module.exports = bot

