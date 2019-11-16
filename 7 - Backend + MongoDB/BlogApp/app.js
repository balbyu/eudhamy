const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    sanitizer = require("express-sanitizer");

// App Config
mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(sanitizer());
app.use(methodOverride("_method"));
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
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs: blogs });
        }
    })
})

// NEW - Shows the user a form for creating new blog post
app.get("/blogs/new", function (req, res) {
    res.render("new")
})

// CREATE - Creates a new blog post
app.post("/blogs", (req, res) => {

    let blog = req.body.blog;
    blog.body = req.sanitize(blog.body);
    if (blog.image == "") {
        delete blog.image;
    }

    // Create Blog. Redirect back to blogs after creation.
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
})

// SHOW - Shows one specified blog post
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    })
});

// EDIT - Shows the edit form for one specified blog post
app.get("/blogs/:id/edit", (req, res) => {

    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog: foundBlog });
        }
    })
});

// CANCEL EDIT - Shows the edit form for one specified blog post
app.post("/blogs/:id/cancel", (req, res) => {
    res.redirect("/blogs/" + req.params.id);
});

// UPDATE - Updates a paticular blog post
app.put("/blogs/:id", function (req, res) {

    let blog = req.body.blog;
    blog.body = req.sanitize(blog.body);
    
    Blog.findByIdAndUpdate(req.params.id,
        req.body.blog,
        (err, updateBlog) => {
            if (err) {
                res.redirect("/blogs");
            } else {
                res.redirect("/blogs/" + req.params.id);
            }
        })
})

// DESTROY - Deletes a paticular blog post
app.delete("/blogs/:id", function (req, res) {

    Blog.findByIdAndDelete(req.params.id,
        req.body.blog,
        (err, updateBlog) => {
            res.redirect("/blogs");
        })

})


// Kick off BlogApp
app.listen(3000, () => {
    console.log("BlogApp listening on port 3000.");
})