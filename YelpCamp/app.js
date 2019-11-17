/**
 * App.js
 * 
 * This is our entry into the YelCamp Node appliaction. It handles the initial setup,
 * importation, and execution of our YelpCamp app.
 */

const express = require("express"),
      mongoose = require("mongoose"),
      app = express(),
      bodyParser = require("body-parser"),
      seedDatabase = require("./seeds"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDatabase();

// Home Page 
app.get("/", (req, res) => {
    res.render("landing")
})

// INDEX - Show all campgrounds
app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // Send campgrounds to the .ejs file under var "campgrounds"
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
})

// CREATE CAMPGROUND - add a new campground to db
app.post("/campgrounds", (req, res) => {
    // Get data from form and add to campgrounds array
    var name = req.body.name,
        image = req.body.image,
        description = req.body.description;
    
    // Create new campground in DB
    Campground.create(
        {
            name: name,
            image: image,
            description: description
        }, function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds")
            }
        }
        )
    })
    
    // NEW CAMPGROUND - Show form to create new campground
    app.get("/campgrounds/new", (req, res) => {
        res.render("campgrounds/new")
    })

    // SHOW CAMPGROUND - Show an individual campground from db
    app.get("/campgrounds/:id", (req, res) => {

        // Find campground by ID
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){

            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/show", {campground: foundCampground});
            }
        });
    })

    // NEW COMMENT - Show form to add new comment to campground
    app.get("/campgrounds/:id/comments/new", (req, res) => {
        Campground.findById(req.params.id, (err, campground) => {
            res.render("comments/new", {campground: campground});
        })
    });

    // CREATE COMMENT - Creates a new comment for specific campground
    app.post("/campgrounds/:id/comments", (req, res) => {

        // Find campground by ID
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                console.log(err);
                res.redirect("/campgrounds")
            }else{
                Comment.create(req.body.comment, (err, comment) => {
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id)
                })
            }
        });
    })

    app.listen(3000, () => {
    console.log("YelpCamp server has started on port 3000.");
})