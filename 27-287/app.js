var express = require("express");
var app = express();
var request = require("request");

var base_url = "http://www.omdbapi.com/?";
var api_key = "apikey=c8a48e65";

var url = base_url  + api_key;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/result", function (req, res) {
    let search = req.query.search;
    url = url + "&s=" + search
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("result", {data : data});
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});


