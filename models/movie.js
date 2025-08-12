const { Schema, model } = require("mongoose");

// declare schema for movies
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// create a Modal from the schema
const Movie = model("Movie", movieSchema);

// export the modal
module.exports = Movie;
