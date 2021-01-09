const mongoose =require("mongoose")

 const  dbconnection=()=>{
    mongoose.connect("mongodb://localhost/URS", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
module.exports=dbconnection
