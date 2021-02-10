
const University=require("../model/UniversityCamp")
const Comment = require("../model/comments")
const Review = require("../model/reviews")

async function checkingOwrnership(req, res, next) {
    try{
         if(req.isAuthenticated()){
               const foundUniversity=await University.findByIdAndUpdate(req.params.id, req.body.university)
                if (foundUniversity.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "You are Authorize to do this Action")
                    res.redirect("back")
                }
        }else{
              req.flash("error", "You need to be loggedIn")
              res.redirect("back")
        }
    }catch(error){
        req.flash("error", "Something went  wrong")
        res.redirect("back")
    }
  
}


async function checkCommentOwnership(req, res, next) {
    try{
         if (req.isAuthenticated()) {
              const foundComment=await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
               if (foundComment.author.id.equals(req.user._id)) {
                   next()
               } else {
                   req.flash("error", "You are Authorize to do this Action")
                   res.end("you are not authorize")
               }
         }else{
               req.flash("error", "You need to be logging")
               res.redirect("back")
         }
    }catch(error){
         req.flash("error", "Something Went Wrong")
         res.redirect("back")
    }
    // if (req.isAuthenticated()) {
    //     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
    //         if (err) {
    //              req.flash("error", "Something Went Wrong")
    //             res.redirect("back")
    //         } else {
    //             if (foundComment.author.id.equals(req.user._id)) {
    //                 next()
    //             } else {
    //                  req.flash("error", "You are Authorize to do this Action")
    //                 res.end("you are not authorize")
    //             }

    //         }
    //     })
    // } else {
    //      req.flash("error", "You need to be loggedIn")
    //     res.redirect("back")
    // }
}


function checkReviewOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Review.findById(req.params.review_id, function (err, foundReview) {
            if (err || !foundReview) {
                console.log("not found",err)
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

function checkReviewExistence(req, res, next) {
    if (req.isAuthenticated()) {
        University.findById(req.params.id).populate("reviews").exec(function (err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else { 
                // check if req.user._id exists in foundCampground.reviews
                var foundUserReview = foundCampground.reviews.some(function (review) {
                    return review.author.id.equals(req.user._id);
                });
                if (foundUserReview) {
                    req.flash("error", "You already wrote a review.");
                    return res.redirect("/University/" + foundCampground._id);
                }
                // if the review was not found, go to the next middleware
                next();
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};

async function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error","You need to be loggedIn")
    res.redirect("/auth/login")
}



module.exports={
    checkingOwrnership,
    checkCommentOwnership,
    checkReviewOwnership,
    checkReviewExistence,
    isLoggedIn
}