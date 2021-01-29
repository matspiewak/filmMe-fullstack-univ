const express = require("express");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res, next) => {
  Movie.find()
    .then((docs) => {
      res.status(200).json({
        message: "Found movies",
        info: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post("/create",passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    filmUrl: req.body.filmUrl,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
  });
  movie
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Movie successfully added",
        info: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get("/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((doc) => {
      res.status(200).json({
        message: "Details of " + doc.title + ": ",
        info: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.patch("/:movieId", (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    {
      title: req.body.movieTitle,
      author: req.body.movieAuthor,
    },
    {
      new: true,
    }
  )
    .then((doc) => {
      res.status(200).json({
        message: "Movie edited successfully",
        info: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.delete("/:movieId", (req, res, next) =>{
    Movie.findByIdAndDelete(req.params.movieId)
    .then(doc =>{
        res.status(200).json({
            message: "movie "+ doc.title +" was successfully deleted",
            info: doc,
        })
    })
    .catch(err =>{
        res.status(500).json({
            message: err.message,
        })
    })
})

module.exports = router;
