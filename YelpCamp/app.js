const express = require("express");
const app = express();
const bodyParser = require("body-parser");

var campgrounds = [
    { name: "Salmon Creek", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" },
    { name: "Bute Crest Vista", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
    { name: "Ugly Forest", image: "https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }
]

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing")
})

// Campgrounds Page
app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds: campgrounds });
})

// New Campgrounds Form
app.get("/campgrounds/new", (req, res) => {
    res.render("new")
})

// Post Campgrounds
app.post("/campgrounds", (req, res) => {
    // Get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    campgrounds.push({name: name, image: image})
    //redirect back to campgrounds page
    res.redirect("/campgrounds")
})

app.listen(3000, () => {
    console.log("YelpCamp server has started on port 3000.");
})