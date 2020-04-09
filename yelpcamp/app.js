var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var seedDB = require("./seeds");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

// seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/yelpcamp");

mongoose.connect("mongodb+srv://ben:mellon0611@cluster0-1uxzf.mongodb.net/test?retryWrites=true&w=majority");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

app.use(require("express-session")({
  secret: "hunter horse battery staple",
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/auth");

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
