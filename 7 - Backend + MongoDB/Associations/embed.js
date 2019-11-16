    const mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true, useUnifiedTopology: true });

    // POST - title, connect
    let postSchema = new mongoose.Schema({
        title: String,
        content: String
    });

    let Post = mongoose.model("Post", postSchema);

    // USER - email, name
    let userSchema = new mongoose.Schema({
        email: String,
        name: String,
        posts: [postSchema]
    });

    let User = mongoose.model("User", userSchema);


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // let newUser = new User({
    //     email: "hermione@hogwarts.edu",
    //     name: "Hermione Granger"
    // })

    // let newPost = new Post({
    //     title: "Reflections on Apples",
    //     content: "They are delicious"
    // });

    // newUser.posts.push({
    //     title: "How to brew polyjuice potion",
    //     content: "Just kidding."
    // })

    // newUser.save((err, user) => {
    //     console.log(user);
    // })

