var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/embed_practice");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var Post = mongoose.model("Post", postSchema);

// var newUser = new User ({
//     email: "bentest2@benwal.com",
//     name: "bentest2"
// });

// newUser.posts.push({
//     title: "why i like kiwis",
//     content: "kiwis are the greatest"
// });

// newUser.save(function (err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post ({
//     title: "why i love apples",
//     content: "apples are the greatest"
// });

// newPost.save(function(err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "bentest2"}, function(err, user) {
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "why i hate plums",
            content: "the color purple"
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});