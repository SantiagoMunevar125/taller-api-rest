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
    match: [/^[a-zA-Z0-9\s.]+$/],
    unique: true
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