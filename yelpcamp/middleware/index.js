var Campground = require("../models/campground");
var Comment = require("../models/comment");

let middlewareObj = {

};

middlewareObj.validateCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                console.log(err);
                res.flash("error", "cannot find comment");
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.flash("error", "you are not the author of this comment");
                    res.redirect("back");
                }

            }
        })
    } else {
        res.redirect("back");
    }
};

middlewareObj.validateCampgroundOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                console.log(err);
                res.flash("error", "cannot find campground");
                res.redirect("back");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.flash("error", "you are not the author of this campground");
                    res.redirect("back");
                }

            }
        })
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "please login first");
    res.redirect("/login");
};

module.exports = middlewareObj;