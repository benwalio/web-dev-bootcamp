var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("henlo there");
});

app.get("/bye", function (req, res) {
  res.send("gbye");
})

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
