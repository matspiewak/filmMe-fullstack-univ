const express = require("express");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res, next) => {
  Review.find()
    .then((docs) => {
      res.status(200).json({
        message: "Found reviews: ",
        info: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const review = new Review({
      _id: new mongoose.Types.ObjectId(),
      movieId: req.body.movieId,
      title: req.body.reviewTitle,
      content: req.body.reviewContent,
      author: req.user.id,
      token: req.query.secret_token,
    });
    review
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Review added: ",
          info: doc,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  }
);

module.exports = router;
