const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  stock: Number,
  price: Number,
  image: String
},{
  timestamps: true
})

let Item = mongoose.model('Items', itemSchema)

module.exports = Item
