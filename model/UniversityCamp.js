const mongoose=require("mongoose")
const UserSchema = mongoose.Schema({
    name: String,
    image: String,
    description:String
})

const User = mongoose.model("User", UserSchema)

module.exports=User