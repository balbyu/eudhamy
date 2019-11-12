// Import Mongoose and connect to running localhost DB
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true });

// Define schema for our cat class
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
})

// Compile "Cat" model with catSchema. The name of the model should be the singular version of what is in the database.
var Cat = mongoose.model("Cat", catSchema);

// Add a new cat to the DB

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function (err, cat) {
//     if (err) {
//         console.log("Something went wrong..." + err);
//     } else {
//         console.log("We just saved a cat!");
//         console.log(cat);
//     }
// });

//Short-hand create and save
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Nice"
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
})

// Retreieve all cats from DB
Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no! The error is: " + err);
    }else{
        console.log("All the cats...");
        console.log(cats);
    }
})