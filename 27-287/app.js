var express = require("express");
var app = express();
var request = require("request");

process.env.PORT = 3000;
process.env.IP = "127.0.0.1";

var base_url = "http://www.omdbapi.com/?";
var api_key = "apikey=c8a48e65";
var data = [];

var url = base_url  + api_key;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/result", function (req, res) {
    let search = req.query.search;
    url = url + "&s=" + search
    
    // let data = [];
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let title_data = JSON.parse(body);
            let imdb_id = [];
            title_data["Search"].forEach(function (movie) {
                if (movie["Type"] === "movie") {
                    imdb_id.push(movie["imdbID"]);
                }
            })
            // console.log(imdb_id);
            
            for ( let i = 0 ; i < imdb_id.length; i++ ) {
                let url = base_url + api_key + "&i=" + imdb_id[i];
                
                request(url, function (error, response, body) {
                    let movie_data = JSON.parse(body);
                    // data[i] = movie_data;
                    // console.log(movie_data["Title"]);
                    //console.log(typeof data);
                    data.push(movie_data);
                    // data.movie = {};
                    // data.title = movie_data["Title"];
                    // data.year = movie_data["Year"];
                    // data.plot = movie_data["Plot"];
                    // console.log(data);
                })
            console.log(data);
            }
            
        }
    })
    console.log(data);
    res.render("result", {
        data: data
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("server started " + process.env.IP + ":" + process.env.PORT);
});


