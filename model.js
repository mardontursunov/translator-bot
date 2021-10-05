const client = require( './dbconfig')
const Schema = require('mongoose').Schema

const UserSchema = new Schema({
    chat_id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    step: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
    },
    age: {
        type: Number,
        min: 16
    }
})

async function UserModel() {
    let db = await client()
    return await db.model('users', UserSchema)
}



async function findUser (chat_id) {
    let db = await UserModel()
    return await db.findOne({ chat_id: chat_id })
}

async function createUser (chat_id) {
    let db = await UserModel()
    return await db.create({ chat_id: chat_id })
}

async function setName (chat_id, name) {
    let db = await UserModel()
    return await db.updateOne({ chat_id }, { name })
}

module.exports = {
    findUser,
    createUser,
    setName
}