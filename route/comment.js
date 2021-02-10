
var express = require('express');
const University = require("../model/UniversityCamp")
const Comment = require("../model/comments")
const middleware=require("../middleware/middleware")
var router = express.Router({mergeParams:true});

// comment
router.get("/new", middleware.isLoggedIn, async (req, res)=> {
    try{
        let university =await University.findById(req.params.id)
         res.render("comment/newcommet", {
                     data:university
         })
    }catch(err){
          req.flash("error", "Something Went Wrong")
          res.redirect("back")
    }
})

router.post("/", middleware.isLoggedIn, async (req, res)=>{
    try{
       const university =await University.findById(req.params.id)
        const comment=await Comment.create(req.body.comment)
          comment.author.id = req.user._id,
          comment.author.username = req.user.username
          comment.save()
          university.comment.push(comment)
          university.save()
          req.flash("success", "Comment Created Successfilly")
          res.redirect("/university/" + req.params.id)
    }catch(error){
         req.flash("error", "Something Went Wrong")
         res.redirect("back")
    }
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

router.put("/:comment_id/update", middleware.checkCommentOwnership,  async(req, res)=>{
            try{
               const foundComment=await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
                req.flash("success", "Comment Updated Successfilly")
                res.redirect("/university/" + req.params.id)
            }catch(error){
                    req.flash("error", "Something Went Wrong")
                    res.redirect("back")
            }
})


//delete
router.delete("/:comment_id/delete", middleware.checkCommentOwnership, async(req, res)=>{
      try{
               await Comment.findByIdAndRemove(req.params.comment_id)
               req.flash("error", "Comment Deleted Successfilly")
               res.redirect("/university/" + req.params.id)
      }catch(error){
          req.flash("error", "Something Went Wrong")
          res.redirect("back")
      }

})




module.exports=router