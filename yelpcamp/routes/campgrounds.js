var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// campground view all
router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    })
});

// campground new
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// campground create
router.post("/", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var descrip = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        image: image,
        description: descrip,
        author: author
    };

    // campgrounds.push(newCampground);
    Campground.create(newCampground,
        function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log(campground);
                res.redirect("/campgrounds");
            }
        }
    );
});

// campground view
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render("campgrounds/show", {
                campground: campground
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;