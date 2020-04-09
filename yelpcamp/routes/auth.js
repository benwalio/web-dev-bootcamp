var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
});

router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.flash("error", "server error [" + err.message + "]");
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.flash("success", "you have created an account");
                res.redirect("/campgrounds");
            });
        }
    });
});

// login routes

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

// logout route

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "you are now logged out");
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.flash("error", "you need to be logged in");
    res.redirect("/login");
};

module.exports = router;