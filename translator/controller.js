const bot = require('./bot')
const translate = 
const { findUser, createUser, setText } = require('./model')

bot.on('message', async (message) => {
    const chat_id = message.chat.id
    const message_id = message.message_id
    const name = message.from.first_name
    const text = message.text

    let user = await findUser(chat_id)
    
    if(!user) {
        await createUser(chat_id)
        await bot.sendMessage(chat_id, `Birorta so'z kiriting!` )
    } else {

        const keyboard = {
            inline_keyboard: [
                [
                    {
                        text: "UZ",
                        callback_data: 'uz'
                    },
                    {
                        text: "RU",
                        callback_data: 'ru'
                    },
                ],
                [
                    {
                        text: "EN",
                        callback_data: 'en'
                    },
                    {
                        text: "AR",
                        callback_data: 'ar'
                    },
                ],
            ]
        }

        await setText(chat_id, text)
        await bot.sendMessage(chat_id, text, {
            reply_markup: keyboard
        })
    }

})

bot.on('callback_query', async (query) => {
    const data = query.data
    const chat_id = query.from.id
    const text = query.message.text

    let user = await findUser(chat_id)



})