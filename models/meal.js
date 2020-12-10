const mongoose = require("mongoose")

const Schema = mongoose.Schema
const mealSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    title: String,
    description: String,
    time: String,
    category: String,
    servings: String,
    calories: String,
    price: Number,
    top: Boolean,
    photo: String
})
const Meal = mongoose.model("meal", mealSchema)

module.exports = Meal