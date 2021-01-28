
const express =require("express")
require('dotenv').config()
const bodyParser=require('body-parser')
const UniversityRoute=require("./route/University")
const CommentRoute = require("./route/comment")
const IndexRoute = require("./route/index")
const AuthenticationRoute = require("./route/User")
const User = require("./model/user")
const passport=require("passport")
var flash = require('connect-flash');
const LocalStratergy=require("passport-local")
const methodOverride=require("method-override")
const dbConnection =require('./config/dbconnection')
const app=express()

//database connection
dbConnection()

//set body-parser
app.use(bodyParser.urlencoded({extended:true}))

//serving static file

app.use(express.static(__dirname+"/public"))


//passport  configuration
app.use(require("express-session")({
    secret:"youcantfindme",
    resave:false,
    saveUninitialized:false
}));

app.use(methodOverride("_method"))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(flash());

app.use(function (req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
     res.locals.success = req.flash("success")
    next();
})

//settting view engine ejs
app.set("view engine","ejs")

app.use('/university', UniversityRoute)
app.use('/auth', AuthenticationRoute)
app.use('/university/:id/comment', CommentRoute)
app.use('/', IndexRoute)


app.listen(process.env.PORT ,()=>{
    console.log("listening at "+process.env.PORT)
})