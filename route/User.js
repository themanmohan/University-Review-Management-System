var express = require('express');
const passport = require('passport');
const User = require('../model/user');
var router = express.Router();

router.get("/register",async(req,res)=>{
    res.render("Auth/register")
})

router.post("/register", async(req, res)=>{
    try{
        var newUser = new User({
            username: req.body.username
        })
        const user=await User.register(newUser, req.body.password)
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "welcome to URS " + user.username)
            res.redirect("/university")
        })
    }catch(error){
       req.flash("error", error.message)
       return res.render("Auth/register");
    }
})

router.get("/login",  async(req, res)=>{
    res.render("Auth/login")
})



router.post("/login",passport.authenticate("local",{
    successRedirect:"/university",
    failureRedirect:"/auth/login",
}),async(req,res)=>{
   req.flash("success", "You are loggedIn Successfully")
})   

//logout

router.get("/logout",async (req,res)=>{
    req.flash("error","you logged out")
    req.logout();
    res.redirect("/university")
})

module.exports=router