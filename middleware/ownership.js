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

module.exports=checkingOwrnership