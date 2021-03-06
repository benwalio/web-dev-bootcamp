var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// comment new
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            router.redirect("/campgrounds/" + req.params.id);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });

});

// comment create
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    res.flash("success", "successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
});

router.get("/:comment_id/edit", middleware.validateCommentOwner, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log (err);
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:comment_id", middleware.validateCommentOwner, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete("/:comment_id", middleware.validateCommentOwner, function (req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function (err) {
        res.redirect("/campgrounds/" + req.params.id);
    })
});

module.exports = router;