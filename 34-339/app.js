var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/yelpcamp");

mongoose.connect("mongodb+srv://ben:mellon0611@cluster0-1uxzf.mongodb.net/auth?retryWrites=true&w=majority");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

app.use(require("express-session")({
    secret: "hunter horse battery staple",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

/*  ====
 *  ROUTES
 */

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

// AUTH ROUTES

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {

    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("secret");
            });
        }
    });
});

// login routes

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "secret",
    failureRedirect: "login"
}), function (req, res) {

});

// logout route

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

function isLoggedIn (req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("login");
};

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server started " + process.env.IP + ":" + process.env.PORT);
});