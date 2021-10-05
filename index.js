const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
});

const { createUser, findUser } = require('./model')

bot.on('message', async (message) => {
    const chat_id = message.chat.id
    const message_id = message.message_id
    const name = message.from.first_name
    const text = message.text

    let user = await findUser(chat_id)

    console.log(user);

    if(!user) {
        await createUser(chat_id)
        await bot.sendMessage(chat_id, "Salom mehmon, ismingizni kiriting!")
    } else {
        bot.sendMessage(chat_id, text)
    }

});