/**
 * Seeds.js
 * 
 * This helper module seeds our database with generic camppgrounds.
 */

const mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment");

/**
 * Seeds the Database asynchronously with basic campgrounds of following attributes:
 *  - Name
 *  - Image
 *  - Description
 *  - Comments
 */
async function seedDatabase() {
    try {
        await Comment.deleteMany({});
        await Campground.deleteMany({});
    
        for (const seed of seeds) {
            let campground = await Campground.create(seed);
            let comment = await Comment.create(
                {
                    text: "This place is great, but I wish there was internet",
                    author: "Homer"
                }
            )
            campground.comments.push(comment);
            campground.save();
        }
    } catch (error) {
        console.log(`Im a noob and can't handle failed try/catches. Here is the error: ${error}`);
    }
}

/* An array of campground seed data */
let seeds = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

module.exports = seedDatabase;