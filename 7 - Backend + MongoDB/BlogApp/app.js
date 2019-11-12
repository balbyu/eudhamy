const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");


// App Config
mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Mongoose Model / Configuration
var blogSchema = new mongoose.Schema({
    title: String,
    image:
    {
        type: String, default: "https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg"
    },
    body: String,
    created:
    {
        type: Date, default: Date.now
    }
})

var Blog = mongoose.model("Blog", blogSchema);

//
// RESTful Routes - All 7 RESTful routes for out Blog App
//

// Root page. Redirects to Index
app.get("/", function (req, res) {
    res.redirect("/blogs")
})

// INDEX - Displays all the blog posts
app.get("/blogs", function (req, res) {

    Blog.find((err, blogs) => {
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    })
})

// NEW - Shows the user a form for creating new blog post
app.get("/blogs/new", function (req, res) {
    res.render("new")
})

// // CREATE - Creates a new blog post
// app.post("/blog", function (req, res) {

// })

// // SHOW - Shows one specified blog post
// app.get("/blog/:id", function (req, res) {

// })

// // EDIT - Shows the edit form for one specified blog post
// app.get("/blog/:id/edit", function (req, res) {

// })

// // UPDATE - Updates a paticular blog post
// app.put("/blog/:id", function (req, res) {

// })

// // DESTROY - Deletes a paticular blog post
// app.delete("/blog/:id", function (req, res) {

// })


// Kick off BlogApp
app.listen(3000, () => {
    console.log("BlogApp listening on port 3000.");
})