// ==================
//      IMPORTS
//===================

const apiPort = 3000,
    express = require("express"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local");

// ==================
//    INITIALIZE
//===================

mongoose.connect("mongodb://localhost/auth_demo", { useNewUrlParser: true, useUnifiedTopology: true });

let app = express();

// Setup EJS
app.set('view engine', 'ejs');

// Setup session middleware with given options
app.use(require("express-session")({
    secret: "Speak friend and enter.",
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: true }))

// Setup Passport.js stuff
app.use(passport.initialize());
app.use(passport.session());

// Serialize / Deserialize the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()))

// ==================
//      ROUTES
//===================

/**
 * Home - This is the home page.
 */
app.get('/', (req, res) => {
    res.render("home");
})

/**
 * Secret - This is the secret page. Users should only be allowed in if ther session is active by calling isLoggedIn before the render of the secret page.
 */
app.get('/secret', isLoggedIn, (req, res) => {
    res.render("secret")
})

/**
 * Show Register Form - Where the user signs up for our application
 */
app.get("/register", (req, res) => {
    res.render("register");
})

/**
 * Handle Registration Request - Handles the user form that is submitted on the registration page. 
 */
app.post("/register", (req, res) => {

    // Creates new user, saves the hashed password to DB, redirects to secret page if authenticated.
    User.register(new User({
        username: req.body.username
    }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                res.render("/register")
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secret")
                })
            }
        })

})

/**
 * Login Route - Renders the login form
 */
app.get("/login", (req, res) => {
    res.render("login")
})

/**
 * Login Logic - Logs in the user based on middleware redirect.
 */
app.post("/login",
    passport.authenticate("local",
        {
            successRedirect: "/secret",
            failureRedirect: "/login"
        }),
    (req, res) => {
        // Do nothing
    });

/**
 * Logout - Logs the user out and redirects to home.
 */
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

/**
 * Checks to see if the user is currently authenticated. If they are, this will return the next callback in the que. If they aren't, this will redirect the user to the login page to try again.
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next The next function to call
 */
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
}

// Listen on port
app.listen(apiPort, () => {
    console.log(`Starting up the Authentication Demo on port ${apiPort}`);
})