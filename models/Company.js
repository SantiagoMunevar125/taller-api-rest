const mongoose = require ('mongoose')
const {Schema} = mongoose

const CompanySchema = new Schema({
  id: {
    type: Number,
    required: [true, "id required"],
    unique: true
  },
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z\s]+$/]
  },
  country: {
    type: String,
    required: true
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "game"
    }
  ]
})

module.exports = mongoose.model('company', CompanySchema)