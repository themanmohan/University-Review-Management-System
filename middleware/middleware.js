
const University=require("../model/UniversityCamp")
const Comment = require("../model/comments")


function checkingOwrnership(req, res, next) {
    if (req.isAuthenticated()) {
        University.findByIdAndUpdate(req.params.id, req.body.university, function (err, data) {
            if (err) {
                res.redirect("back")
            }

            if (data.author.id.equals(req.user._id)) {
                next()
            } else {
                res.redirect("back")
            }
        })
    } else {
        res.end("wejwejfjwehfvwe")
    }
}


function checkCommentOwnership(req, res, next) {
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