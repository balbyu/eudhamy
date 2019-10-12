var express = require("express")
var bodyParse = require("body-parser")
var app = express();
app.use(bodyParse.urlencoded({extended: true}))

app.set("view engine", "ejs")

var friends = ["Susie", "Bart", "Thompson", "Victoria"];

app.get("/", function(req, res){
    res.render("home")
})

app.get("/friends", function(req, res){
    
    res.render("friends", {friends: friends})
})

app.post("/addfriend", function(req, res){
    friends.push(req.body.newFriend)
    res.redirect("/friends");
})

app.listen(8080, function(){
    console.log("Server Started on Port 8080!")
})