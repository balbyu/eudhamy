const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/user");

mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true });


