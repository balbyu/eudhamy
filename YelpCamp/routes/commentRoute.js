/**
 * commentRoute.js
 * 
 * This class represents the comment route that handles misc comment functionality in YelpCamp.
 * 
 *  - New Comment Form
 *  - Post New Comment
 */

const express = require("express"),
router = express.Router(),
Campground = require("../models/campground"),
Comment = require("../models/comment");
module.exports = router;

/**
 * Show New Comment Form - Shows form to add new comment to campground, but only if 
 * user is currently logged in.
 */
router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render("comments/new", { campground: campground });
    })
});

/**
 * Create New Comment - Creates a new comment for specific campground
 */
router.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {

    // Find campground by ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                // Add username and ID to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // Save the comment
                comment.save();
                foundCampground.comments.push(comment);
                foundCampground.save();
                console.log(comment);
                res.redirect("/campgrounds/" + foundCampground._id)
            })
        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}