const express = require("express");
const router = express.Router();
const Campground = require("../models/campground")


// INDEX - Show all campgrounds
router.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // Send campgrounds to the .ejs file under var "campgrounds"
            res.render("campgrounds/index",
                {
                    campgrounds: allCampgrounds
                });
        }
    })
})

// CREATE CAMPGROUND - add a new campground to db
router.post("/campgrounds", isLoggedIn, (req, res) => {
    // Get data from form and add to campgrounds array
    let name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        }
        newCampground = {name: name, image: image, description: description, author: author};

    // Create new campground in DB
    Campground.create(newCampground, (err, campground) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds")
            }
        }
    )
})

// NEW CAMPGROUND - Show form to create new campground
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

// SHOW CAMPGROUND - Show an individual campground from db
router.get("/campgrounds/:id", (req, res) => {

    // Find campground by ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {

        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
