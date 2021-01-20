
const express =require("express")
require('dotenv').config()
const bodyParser=require('body-parser')
const University=require("./route/University")
const dbConnection =require('./config/dbconnection')
const app=express()

//database connection
dbConnection()

//set body-parser
app.use(bodyParser.urlencoded({extended:true}))

//settting view engine ejs
app.set("view engine","ejs")

app.use('/',University)


app.listen(process.env.PORT ,()=>{
    console.log("listening at "+process.env.PORT)
})