const mongoose = require('mongoose')
const {Schema} = mongoose

const GameSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true
  }
})

module.exports = mongoose.model('game', GameSchema)