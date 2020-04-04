var request = require("request");

var base_url = "https://api.darksky.net/forecast/";
var secret_key = "c75d405bc4af905417fa1c7e7dc7bf04";
var lat = 39.951061;
var long = -75.165619;

var url = base_url + secret_key + "/" + lat + "," + long;

request(url, function (error, response, body) {
    var data = JSON.parse(body);
    if (!error && response.statusCode === 200) {
        console.log(data["daily"]["data"][0]["sunriseTime"]);
        var time = new Date(data["daily"]["data"][0]["sunriseTime"]).toLocaleTimeString("en-US");
        console.log(time);
    } else if (error) {
        console.log(error);
    }
})