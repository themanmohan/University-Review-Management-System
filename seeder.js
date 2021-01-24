const express = require("express")

const University = require("./model/UniversityCamp")

const dbConnection = require('./config/dbconnection')

const app = express()
//database connection
dbConnection()
const data=[
    {
        name: "manmohan",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        description:"a,wdhkawjdjgdj"
    },
    {
        name: "manmohan",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        description: "a,wdhkawjdjgdj"
    },
    {
        name: "manmohan",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        description: "a,wdhkawjdjgdj"
    }
]
const insertData=()=>{
    data.forEach(uni=>{
        University.create(uni, function (err, university) {
            if (err) {
                console.log(err)
            } else {
                Comment.create({
                    text: "ashgdhg",
                    author: "manmohan"
                }, function (err, comment) {
                    if (err) {
                        console.log(err)
                    } else {
                        university.comment.push(comment)
                        university.save()
                    }
                })

            }
        })
    })
  console.log("inserted")
}

const deleteData = () => {
    University.remove({}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
              console.log("deleted")
        }
    })
}

if (process.argv[2]=="i"){
    insertData()
}

if (process.argv[2] == "d") {
    deleteData()
}

