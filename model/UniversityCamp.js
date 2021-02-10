
const mongoose = require('mongoose')
var UniversitySchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:String
    },
    reviews: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: "Review"
          }],
    rating: {
       type: Number,
       default: 0
          }

})


module.exports = mongoose.model('University', UniversitySchema);