var express = require('express');
const University = require("../model/UniversityCamp")
var router = express.Router();

router.get('/', function (req, res) {

    res.render("landing")
})


router.get('/university', function (req, res) {
    University.find({}, function (err, data) {
        if (err) {
            console.log(err)
        }

        res.render("university", {
            universitys: data
        })
    })

})

router.post('/university', function (req, res) {
    name = req.body.name,
        image = req.body.image,
        description = req.body.description
    const newUniversity = {
        name,
        image,
        description
    }
    University.create(newUniversity, function (err, data) {
        if (err) {
            console.log(err)
        }
    })
    res.redirect("/university")

})

router.get('/university/new', function (req, res) {
    res.render('new')
})

router.get('/university/:id', function (req, res) {
    University.findById(req.params.id).populate("comment").exec(function (err, data) {
        if (err) {
            console.log(err)

        } else {
            res.render("showUniversity", {
                university: data
            })
        }
    })

})

module.exports=router