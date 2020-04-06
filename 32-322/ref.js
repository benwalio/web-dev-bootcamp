var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/ref_practice2");

var Post = require("./models/post");
var User = require("./models/user");

// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });

// var Post = mongoose.model("Post", postSchema);

// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });

// var User = mongoose.model("User", userSchema);

// User.findOne({
//     email: "bentest@benwal.com"
// }).populate("posts").exec(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// User.create({
//     email: "bentest@benwal.com",
//     name: "bentest"
// });

Post.create({
    title: "cook burger pt 3",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos hic minus nulla et commodi incidunt nobis tenetur obcaecati, rem vero distinctio eaque officiis quis corrupti quia asperiores ullam mollitia doloribus?"
}, function(err, post) {
    User.findOne({email: "bentest@benwal.com"}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            user.posts.push(post);
            user.save(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});



// newUser.save(function (err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });