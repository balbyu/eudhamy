var express = require("express");
var app = express();

// Hi There, How Are You
app.get("/", function(req, res){
    res.send("Hi, How Are You!")
})

// Goodbye
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
})

//Dog 
app.get("/dog", function(req, res) {
    console.log("SOMEONE MADE A REQUEST");
    res.send("MEOW!");
})
app.listen(3000, () => {
    console.log("Server has started on Port 3000");
});