
var express = require('express');
const University = require("../model/UniversityCamp")
const Comment = require("../model/comments")
const middleware=require("../middleware/middleware")
var router = express.Router({mergeParams:true});

// comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
    University.findById(req.params.id, function (err, data) {
        if (err) {
             req.flash("error", "Something Went Wrong")
        } else {
            res.render("comment/newcommet", {
                data
            })
        }
    })
})

router.post("/", middleware.isLoggedIn, function (req, res) {
    University.findById(req.params.id, function (err, university) {
        if (err) {
             req.flash("error", "Something Went Wrong")
             res.redirect("back")
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                comment.author.id=req.user._id,
                comment.author.username=req.user.username
                comment.save()
                university.comment.push(comment)
                university.save()
                req.flash("success", "Comment Created Successfilly")
                res.redirect("/university/" + req.params.id)
            })
        }
    })
})


//edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
              req.flash("error", "Something Went Wrong")
              res.redirect("back")
        }
        else{
              res.render("comment/edit", {
                  university_id: req.params.id,comment:foundComment
              })
        }
    })
   
})

router.put("/:comment_id/update", middleware.checkCommentOwnership, function (req, res) {
  
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
            if (err) {
                 req.flash("error", "Something Went Wrong")
                res.redirect("back")
            }else{
                req.flash("success", "Comment Updated Successfilly")
                  res.redirect("/university/" + req.params.id)
            }
        })
})


//delete
router.delete("/:comment_id/delete", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id,function(err,data){
        if(err){
            req.flash("error", "Something Went Wrong")
          res.redirect("back")
        }else{
            req.flash("success", "Comment Deleted Successfilly")
            res.redirect("/university/"+req.params.id)
        }
    })
})




module.exports=router