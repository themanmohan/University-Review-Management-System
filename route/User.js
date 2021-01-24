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
            console.log(err);
            return res.render("Auth/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/university")
        })
    })
})

router.get("/login", function (req, res) {
    res.render("Auth/login")
})



router.post("/login",passport.authenticate("local",{
    successRedirect:"/university",
    failureRedirect:"/login"
}),function(req,res){
   console.log(req.user)
})   

//logout

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/university")
})

module.exports=router