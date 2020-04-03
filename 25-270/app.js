var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("henlo there, welcome to my assign");
});

app.get("/speak/:animal", function (req, res) {
  let animal = req.params.animal;
  let sound = "pay your taxes";

  if (animal === "cow") {
    sound = "moo";
  } else if (animal === "pig") {
    sound = "oink";
  } else if (animal === "monkey") {
    sound = "monkey noise";
  } else if (animal === "nixon") {
    sound = "AROOOO";
  } else if (animal === "cat") {
    sound = "mew";
  }

  res.send("the " + animal + "says \'" + sound "\'!");
});

app.get("/repeat/:word/:num", function (req, res) {
  let word = req.params.word;
  let num = req.params.num;

  for (let i = 0; i <= num; i++) {
    res.send(word);
  }
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
