const Mongoose = require('mongoose');

async function client (){
    return await Mongoose.connect('mongodb://localhost/translator-bot')
}

module.exports = client