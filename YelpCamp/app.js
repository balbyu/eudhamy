const express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render("index", { campgrounds: allCampgrounds });
        }
    })
})


// CREATE - add a new campground to db
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
    
    // NEW - Show form to create new campground
    app.get("/campgrounds/new", (req, res) => {
        res.render("new")
    })

    // SHOW - Show an individual campground from db
    app.get("/campgrounds/:id", (req, res) => {

        // Find campground by ID
        Campground.findById(req.params.id, function(err, foundCampground){

            if(err){
                console.log("You mess up!");
                console.log(err);
            }else{
                res.render("show", {campground: foundCampground});
            }

        });
    })

    app.listen(3000, () => {
    console.log("YelpCamp server has started on port 3000.");
})