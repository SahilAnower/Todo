const mongoose = require("mongoose")
const User = require("./user")

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completedOrNot: {
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps: true})

const Todo = mongoose.model("todo", TodoSchema)

module.exports = Todo