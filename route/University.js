var express = require('express');
const University = require("../model/UniversityCamp")
const Comment = require("../model/comments")
const Review = require("../model/reviews")
const middleware = require("../middleware/middleware")

var router = express.Router();




router.get('/', async (req, res) => {
    try {
        const university = await University.find({})
        if (university) {
            res.render("University/university", {
                universitys: university
            })
        }
    } catch (error) {
        req.flash("error", "Something went  wrong")
        res.redirect("back")
    }
})
router.post('/', middleware.isLoggedIn, async (req, res) => {
    try {
        var name = req.body.name,
            image = req.body.image,
            description = req.body.description
        const author = {
            id: req.user._id,
            username: req.user.username
        }
        const newUniversity = {
            name,
            image,
            description,
            author

        }

        await University.create(newUniversity)
        req.flash("success", "University Added successfully")
        res.redirect("/university")
    } catch (error) {
        req.flash("error", "Something went  wrong")
        res.redirect("back")
    }

})

router.get('/new', middleware.isLoggedIn, async (req, res) => {
    res.render('University/new')
})

router.get('/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id).populate('comment').populate({
            path: "reviews",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        }).exec()
        res.render("University/showUniversity", {
            university
        })
    } catch (error) {
        req.flash("error", "Something went  wrong")
        res.redirect("back")

    }
})

//edit

router.get("/:id/edit", middleware.isLoggedIn, async (req, res) => {
    try {
        const foundUniversity = await University.findById(req.params.id)
        res.render("University/edit", {
            foundUniversity
        })
    } catch (error) {
        req.flash("error", "Something went  wrong")
        res.redirect("back")
    }

})

router.put("/:id/edit", middleware.checkingOwrnership, async (req, res) => {
    try {
        console.log(req.body.university)
        const founduniversity = await University.findByIdAndUpdate(req.params.id, req.body.university)
        if (!founduniversity) {
            req.flash("error", "Something went  wrong")
            res.redirect("back")
        } else {
            req.flash("success", "Edited Successfully")
            res.redirect("/university/" + req.params.id)
        }
    } catch (error) {
        req.flash("error", "Something went  wrong")
        res.redirect("back")
    }
})




// DESTROY CAMPGROUND ROUTE
router.delete("/:id/delete", middleware.checkingOwrnership, function (req, res) {
    University.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // deletes all comments associated with the campground
            Comment.remove({
                "_id": {
                    $in: campground.comment
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/University");
                }
                // deletes all reviews associated with the campground
                Review.remove({
                    "_id": {
                        $in: campground.reviews
                    }
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/University");
                    }
                    //  delete the campground
                    campground.remove();
                    req.flash("success", "Campground deleted successfully!");
                    res.redirect("/University");
                });
            });
        }
    });
});


module.exports = router