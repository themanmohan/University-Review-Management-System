var express = require('express');
const passport = require('passport');
const User = require('../model/user');
var router = express.Router();

router.get("/register",function(req,res){
    res.render("Auth/register")
})

router.post("/register", function (req, res) {
    var newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error", err.message)
            return res.render("Auth/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "welcome to URS " + user.username)
            res.redirect("/university")
        })
    })
})

router.get("/login", function (req, res) {
    res.render("Auth/login")
})



router.post("/login",passport.authenticate("local",{
    successRedirect:"/university",
    failureRedirect:"/auth/login",
}),function(req,res){
   req.flash("success", "You are loggedIn Successfully")
})   

//logout

router.get("/logout",function(req,res){
    req.flash("error","you Logged Out")
    req.logout();
    res.redirect("/university")
})

module.exports=router