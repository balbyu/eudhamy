const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Home Page 
router.get("/", (req, res) => {
    res.render("landing")
})

// Show Register User - Shows the registration form for a new user
router.get("/register", (req, res) => {
    res.render("register");
})

// Handle Signup Form - Posts the user's data from the signup form
router.post("/register", (req, res) => {
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
router.get("/login", (req, res) => {
    res.render("login");
})

// Handle Login Form - Handles the logic when user logs in
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }));

// Handle Logout - Logic for when user logs out of account
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})

module.exports = router;