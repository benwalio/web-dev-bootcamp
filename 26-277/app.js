var express = require("express");
var app = express();
var bodyParser = require("body-parser");


var friends = ["molly", "sammy", "bobby", "mike"];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/friends", function (req, res) {
    res.render("friends", {friends: friends});
});

app.post("/add-friend", function (req, res) {
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
