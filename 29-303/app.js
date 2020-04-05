var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cats");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat( {
//     name: "molly",
//     age: 7,
//     temperament: "mean"
// });

// george.save(function(err, cat) {
//     if(err) {
//         console.log("error");
//     } else {
//         console.log("object saved");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "red",
    age: 2,
    temperament: "niceish"
    },
    function(err, cat) {
        if (err) {
            console.log(err);
        } else {
            console.log(cat);
        }
    }
);

Cat.find({}, function(err, cats) {
    if(err) {
        console.log("error");
        console.log(err);
    } else {
        console.log(cats);
    }
})