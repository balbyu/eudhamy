/**
 * Index.js
 * 
 * This file serves up all the middleware functions that we use throughout the YelpCamp workflow. It's 
 * mainly used authorization and authentication, but could include other middleware in the future.
 */

const Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middlewareObj = {};

module.exports = middlewareObj;

/**
 * This method checks to see if the current user is logged in. If they are it executes the next function, if they aren't it takes you to the login page.
 * 
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next the next function to execut if success
 */
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

/**
 * This method checks to see if a user is authorized to make any changes to an object. This is a useful middleware for situations like editing comments, deleting posts, etc.
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next the next function to execute if success
 */
middlewareObj.isCommentOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back")
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

/**
 * This method checks to see if a user is authorized to make any changes to an object. This is a useful middleware for situations like editing comments, deleting posts, etc.
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next the next function to execute if success
 */
middlewareObj.isCampgroundOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("back")
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}