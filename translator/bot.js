const TelegramBot = require('node-telegram-bot-api')
const TOKEN = *****

const bot = new TelegramBot(TOKEN, {
    polling: true
})

module.exports = bot

