var express = require('express');
const University = require("../model/UniversityCamp")
const middleware = require("../middleware/middleware")

var router = express.Router();




router.get('/', function (req, res) {

    University.find({}, function (err, data) {
        if (err) {
            console.log(err)
        }

        res.render("University/university", {
            universitys: data,
            currentUser:req.user
        })
      
    })

})
router.post('/', middleware.isLoggedIn, function (req, res) {
    name = req.body.name,
        image = req.body.image,
        description = req.body.description
       const author={
           id:req.user._id,
           username:req.user.username
       }
    const newUniversity = {
        name,
        image,
        description,
        author

    }
    University.create(newUniversity, function (err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data)
    })
    res.redirect("/university")

})

router.get('/new', middleware.isLoggedIn, function (req, res) {
    res.render('University/new')
})

router.get('/:id', function (req, res) {
    University.findById(req.params.id).populate('comment').exec(function (err, data) {
        if (err) {
            console.log(err)

        } else {
            res.render("University/showUniversity", {
                university: data
            })
        }
    })

})

//edit

router.get("/:id/edit",function(req,res){
    University.findById(req.params.id,function(err,foundUniversity){
        if(err){
              console.log(err)
        }else{
           res.render("University/edit", {foundUniversity})
        }
    })
   
})

router.put("/:id/edit", middleware.checkingOwrnership, function (req, res) {
    
       University.findByIdAndUpdate(req.params.id, req.body.university, function (err, data) {
               res.redirect("/university/" + req.params.id)
          
          
       })
   
   
})



router.delete("/:id/delete", middleware.checkingOwrnership, function (req, res) {
   
        University.findByIdAndRemove(req.params.id, function (err, data) {
          res.redirect("/university")
        })
   
})


module.exports=router