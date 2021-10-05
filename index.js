const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
});

const { createUser, findUser, setName, setAge, changeStep } = require('./model')

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
    } else if (user.step == 1) {
        try {
            await setName(chat_id, text.trim())
            await changeStep(chat_id, 2)
            await bot.sendMessage(chat_id, `Barakalloh ${text}, endi yoshingizni kiriting?`)
        } catch (error) {
            bot.sendMessage(chat_id, "Qandaydir xato qildingiz!")
        }
    } else if(user.step == 2) {
        try {
            await setAge(chat_id, Number(text.trim()))
            await changeStep(chat_id, 3)
            await bot.sendMessage(chat_id, "Tanishganimdan xursandman. Siz ro'yxatdan o'tdingiz!")
        } catch (error) {

        }
    }

});