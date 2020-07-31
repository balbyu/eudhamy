//Load up Express (Node JS Web Framework for server shit)
var express = require("Express");
var app = express();


var randomName = "Bobby Mark & John"; // Caitlyn Kerluke
var randomEmail = "Bobby.Mark.John@gmail.com"; // Rusty@arne.info

var client = {
    name: randomName,
    email: randomEmail
};

// Setup Express so we don't have to use file extentions
app.set('view engine', 'ejs');


// Handle any GET requests to base
app.get("/", (req, res) => {
    res.render("./pages/index", {
        client: client
    });
});



app.listen(8080, () => {
    console.log("Server started on magic port 8080!");
});
