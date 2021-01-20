const mongoose = require('mongoose')
var UniversitySchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]

})


module.exports = mongoose.model('UNIVERSITY', UniversitySchema);