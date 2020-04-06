var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelpcamp");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");



// var campgroundSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//       name: "graniteville",
//       image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg",
//       description: "large hill o granite. no bathroom, no water, no sky, no food - only granite"
//     },
//   function (err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(campground);
//     }
//   }
// );

// var campgrounds = [
//   { name: "salmon run", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg" },
//   { name: "graniteville", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg" },
//   { name: "mountain goat rest", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"}
// ];

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        campgrounds: campgrounds
      });
    }
  })

        
    // res.render("campgrounds", {campgrounds : campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
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

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: campground});
    }
  });

  
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
