const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  filmUrl: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("Movie", movieSchema);
