
const University=require("../model/UniversityCamp")
const Comment = require("../model/comments")


function checkingOwrnership(req, res, next) {
    if (req.isAuthenticated()) {
        University.findByIdAndUpdate(req.params.id, req.body.university, function (err, data) {
            if (err) {
                req.flash("error", "Something went  wrong")
                res.redirect("back")
            }

            if (data.author.id.equals(req.user._id)) {
                next()
            } else {
                req.flash("error", "You are Authorize to do this Action")
                res.redirect("back")
            }
        })
    } else {
        req.flash("error", "You Nedd To Be LoggedIn")
        res.redirect("back")
    }
}


function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
            if (err) {
                 req.flash("error", "Something Went Wrong")
                res.redirect("back")
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                     req.flash("error", "You are Authorize to do this Action")
                    res.end("you are not authorize")
                }

            }
        })
    } else {
         req.flash("error", "You Nedd To Be LoggedIn")
        res.redirect("back")
    }
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error","You Nedd To Be LoggedIn")
    res.redirect("/auth/login")
}



module.exports={
    checkingOwrnership,
    checkCommentOwnership,
    isLoggedIn
}