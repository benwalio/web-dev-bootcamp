var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

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
    });
});

// campground new
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// campground create
router.post("/", middleware.isLoggedIn, function (req, res) {
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
                req.flash("success", "successfully added campground");
                res.redirect("/campgrounds");
            }
        }
    );
});

// campground view
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            req.flash("error", "unable to find campground");
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
router.get("/:id/edit", middleware.validateCampgroundOwner, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        res.render("campgrounds/edit", { campground: campground })
    });
});

// campground edit put
router.put("/:id", middleware.validateCampgroundOwner, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
        req.flash("success", "successfully edited campground");
        res.redirect("/campgrounds/" + req.params.id);
    })
});

router.delete("/:id", middleware.validateCampgroundOwner, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function (err) {
        req.flash("success", "successfully deleted campground");
        res.redirect("/campgrounds");
    })
});

module.exports = router;