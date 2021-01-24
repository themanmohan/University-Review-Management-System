const mongoose = require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
userSchema = mongoose.Schema({
    email: String,
    password: String
})
//starting adding method
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", userSchema)