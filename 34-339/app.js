var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/yelpcamp");

mongoose.connect("mongodb+srv://ben:mellon0611@cluster0-1uxzf.mongodb.net/auth?retryWrites=true&w=majority");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function(req, res) {
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server started " + process.env.IP + ":" + process.env.PORT);
});