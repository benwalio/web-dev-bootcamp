var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");

seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/yelpcamp");

mongoose.connect("mongodb+srv://ben:mellon0611@cluster0-1uxzf.mongodb.net/test?retryWrites=true&w=majority");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var descrip = req.body.description;
    var newCampground = {name: name, image: image, description: descrip};
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

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var descrip = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: descrip
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

app.get("/campgrounds/:id", function (req, res) {
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

// comment routes

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err);
        app.redirect("/campgrounds/" + req.params.id);
      } else {
        res.render("comments/new", { campground: campground });
      }
    });
  
});

app.post("/campgrounds/:id/comments", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
