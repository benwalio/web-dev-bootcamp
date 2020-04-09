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

// campground edit view
router.get("/:id/edit", validateCampgroundOwner, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        res.render("campgrounds/edit", { campground: campground })
    });
});

// campground edit put
router.put("/:id", validateCampgroundOwner, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
        res.redirect("/campgrounds/" + req.params.id);
    })
});

router.delete("/:id", validateCampgroundOwner, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
        res.redirect("/campgrounds");
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

function validateCampgroundOwner (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }

            }
        })
    } else {
        res.redirect("back");
    }
};

module.exports = router;