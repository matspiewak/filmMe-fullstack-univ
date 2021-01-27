const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  movieId:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
