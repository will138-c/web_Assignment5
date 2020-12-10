const mongoose = require("mongoose")

const Schema = mongoose.Schema
const cartSchema = new Schema({
    useremail: String,
    id:Number,
    itemtitle: String,
    price: Number
})
const Cart = mongoose.model("cart", cartSchema)

module.exports = Cart