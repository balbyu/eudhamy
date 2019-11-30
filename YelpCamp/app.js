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
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDatabase();

// Passport Config
app.use(require("express-session")({
    secret: "Speak Friend and Enter",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to check if user is logged in for each route. This will pass the local variable currentUser to each template for use
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

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
            res.render("campgrounds/index",
                {
                    campgrounds: allCampgrounds
                });
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
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {

        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
})

// Show New Comment Form - Show form to add new comment to campground only if user is currently logged in.
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render("comments/new", { campground: campground });
    })
});

// Create New Comment - Creates a new comment for specific campground.
app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {

    // Find campground by ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                foundCampground.comments.push(comment);
                foundCampground.save();
                res.redirect("/campgrounds/" + foundCampground._id)
            })
        }
    });
})

// =====================
// Authentication Routes
// =====================

// Show Register User - Shows the registration form for a new user
app.get("/register", (req, res) => {
    res.render("register");
})

// Handle Signup Form - Posts the user's data from the signup form
app.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds")
        })
    });
})

// Show Login Form - Shows the login form to the user
app.get("/login", (req, res) => {
    res.render("login");
})

// Handle Login Form - Handles the logic when user logs in
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }));

// Handle Logout - Logic for when user logs out of account
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("YelpCamp server has started on port 3000.");
})