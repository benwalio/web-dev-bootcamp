var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req,res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("error - " + err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});

app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, blog) {
        if (err) {
            res.render("new");
            console.log("error - " + err);
        } else {
            res.redirect("/blogs");
        }
    })
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            console.log("error - " + err);
            res.redirect("/");
        } else {
            res.render("show", {blog: blog});
        }
    })
});

app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            console.log("error - " + err);
            res.redirect("/");
        } else {
            res.render("edit", {blog: blog});
        }
    })
});

app.put("/blogs/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, blog) {
        if (err) {
            console.log("error - " + err);
            res.redirect("/blogs/" + req.params.id);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndDelete(req.params.id, function (err, blog) {
        if (err) {
            console.log("error - " + err);
            res.redirect("/blogs/" + req.params.id);
        } else {
            res.redirect("/");
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server started " + process.env.IP + ":" + process.env.PORT);
});
