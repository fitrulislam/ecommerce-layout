const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: String,
  stock: Number,
  price: Number,
  src: String
},{
  timestamps: true
})

let Item = mongoose.model('Items', itemSchema)

module.exports = Item
