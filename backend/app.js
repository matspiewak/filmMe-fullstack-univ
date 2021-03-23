const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require('./api/routes/auth')

const app = express();
const movieRoutes = require("./api/routes/movies");
const reviewRoutes = require("./api/routes/reviews");
const signUpRoute = require("./api/routes/signUp");
const signInRoute = require("./api/routes/signIn");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin:zaq1@WSX@social-advertisement-pl.ouefg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use('/movies',movieRoutes);
app.use('/signup',signUpRoute);
app.use('/signin',signInRoute);
app.use('/reviews',reviewRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
