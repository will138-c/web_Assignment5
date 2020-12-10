const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstname: String,
    lastname: String,
    password: String,
    role: Boolean
})
const User = mongoose.model("user", userSchema)

module.exports = User
