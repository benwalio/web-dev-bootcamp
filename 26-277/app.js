var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/friends", function (req, res) {
    var friends = ["molly", "sammy", "bobby", "mike"];
    res.render("friends", {friends: friends});
});

app.post("/add-friend", function (req, res) {
    res.send("git posted");
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
