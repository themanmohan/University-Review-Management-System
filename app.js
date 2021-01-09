
const express =require("express")
require('dotenv').config()
const bodyParser=require('body-parser')
const User=require("./model/UniversityCamp")
const dbConnection =require('./config/dbconnection')
const app=express()

//database connection
dbConnection()

//set body-parser
app.use(bodyParser.urlencoded({extended:true}))

//settting view engine ejs
app.set("view engine","ejs")


app.get('/',function(req,res){

     res.render("landing")
})


app.get('/university', function (req, res) {
     User.find({},function(err,data){
         if(err){
             console.log(err)
         }

         res.render("university",{universitys:data})
     })
    
})

app.post('/university',function(req,res){
    name = req.body.name,
    image=req.body.image,
    description=req.body.description
   const newUniversity={name,image,description}
    User.create(newUniversity,function(err,data){
       if(err){
           console.log(err)
       }
   })
   res.redirect("/university")

})

app.get('/university/new',function(req,res){
    res.render('new')
})

app.get('/university/:id',function(req,res){
    User.findById(req.params.id,function(err,data){
        if(err){
            console.log(err)

        }else{
            console.log(data)
            res.render("showUniversity",{university:data})
        }
    })
    
})



app.listen(process.env.PORT ,()=>{
    console.log("listening at "+process.env.PORT)
})