var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("henlo there, welcome to my assign");
});

app.get("/speak/:animal", function (req, res) {
  let animal = req.params.animal;
  let sound = {
    cow: "moo",
    pig: "oink",
    monkey: "monkey noise",
    nixon: "ARRROOOOOO",
    cat: "mew",
    fish: "blub"
  }

  res.send("the " + animal + " says \'" + sound[animal] + "\'!");
});

app.get("/repeat/:word/:num", function (req, res) {
  let word = req.params.word;
  let num = req.params.num;
  let words = "";

  for (let i = 0; i < num; i++) {
    words = words + " " + word;
  }

  res.send(words);
});

app.get("*", function(req, res) {
    res.send("404 dummy");
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
