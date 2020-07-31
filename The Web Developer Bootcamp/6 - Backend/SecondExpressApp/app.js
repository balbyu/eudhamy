var express = require("express");
var app = express();

var port = 3000;

// Get the homepage route.
app.get("/", function (req, res) {
    res.send("Hi there. Welcome to my assignment.")
})

//Get the animals route
app.get("/speak/:animal", function (req, res) {
    var phrase;
    var animal = req.params.animal;
    animal.toLowerCase;

    var sounds = {
        pig : "\'Oink\'",
        cow : "\'Moo\'",
        dog : "\'Woof Woof!\'",
        turtle : "\'CRUNCH\'",
        bird : "\'Tweet Tweet Little Birdy\'"
    }
    res.send("The " + animal + " says " + sounds[animal]);
});

app.get("/repeat/:word/:number", function(req, res){
    var word = req.params.word;
    var number = Number(req.params.number);
    var returnWord = "";
    for (let index = 0; index < number; index++) {
        returnWord += word + " ";
    }

    res.send(returnWord);

})

app.get("*", function(req, res){
    res.send("Sorry, this page doesn't exist.")
})



app.listen(port, () => {
    console.log("Server started on port " + port);
})