const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    content: String,
    date: Date 
})

const model = mongoose.model('feedbacks', schema)

module.exports = model 