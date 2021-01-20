const mongoose = require("mongoose")

commentSchema = mongoose.Schema({
    text: String,
    author: String
})

module.exports = mongoose.model("Comment", commentSchema)