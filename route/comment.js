
var express = require('express');
const University = require("../model/UniversityCamp")
const Comment = require("../model/comments")
var router = express.Router({mergeParams:true});

// comment
router.get("/new", isLoggedIn, function (req, res) {
    University.findById(req.params.id, function (err, data) {
        if (err) {

        } else {
            res.render("comment/newcommet", {
                data
            })
        }
    })
})

router.post("/", isLoggedIn, function (req, res) {
    University.findById(req.params.id, function (err, university) {
        if (err) {

        } else {
            Comment.create(req.body.comment, function (err, comment) {
                comment.author.id=req.user._id,
                comment.author.username=req.user.username
                comment.save()
                university.comment.push(comment)
                university.save()
                res.redirect("/university/" + req.params.id)
            })
        }
    })
})


//edit
router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
             console.log(err)
        }
        else{
              res.render("comment/edit", {
                  university_id: req.params.id,comment:foundComment
              })
        }
    })
   
})

router.put("/:comment_id/update",checkCommentOwnership,function(req,res){
  
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
            if (err) {
                res.redirect("back")
            }else{
                  res.redirect("/university/" + req.params.id)
            }
        })
})


//delete

router.delete("/:comment_id/delete", checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id,function(err,data){
        if(err){
          res.redirect("back")
        }else{
            res.redirect("/university/"+req.params.id)
        }
    })
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkCommentOwnership(req,res,next){
    if (req.isAuthenticated()) {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.end("you are not authorize")
                }

            }
        })
    } else {
        res.end("please login")
    }
}

module.exports=router