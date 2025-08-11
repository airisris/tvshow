const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MangoDB to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// declare schema for movies
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// declare schema for tvshows
const tvshowSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

// create a Modal from the schema
const Movie = mongoose.model("Movie", movieSchema);
const Tvshow = mongoose.model("Tvshow", tvshowSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding");
});

/*
  Routes for movies
  GET /movies - list all the movies
  GET /movies/68941c3724035d347f420f60 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68941c3724035d347f420f60 - update movie
  DELETE /movies/68941c3724035d347f420f60 - delete movie
*/
// GET /movies - list all the movies
/*
  query params is everything after the ?
*/
app.get("/movies", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create an empty container for filter
  let filter = {};
  // if director exists, then only add it into the filter container
  if (director) {
    filter.director = director;
  }
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the movies data from MongoDB
  const movies = await Movie.find(filter);
  res.send(movies);
});

app.get("/shows", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  // create an empty container for filter
  let filter = {};
  if (genre) {
    filter.genre = genre;
  }
  if (rating) {
    filter.rating = { $gt: rating };
  }
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  // load the movies data from MongoDB
  const tvshows = await Tvshow.find(filter);
  res.send(tvshows);
});

// GET /movies/:id - get a specific movie
app.get("/movies/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

app.get("/shows/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const tvshow = await Tvshow.findById(id);
  res.send(tvshow);
});

// start the express
app.listen(5201, () => {
  console.log("Server in running at http://localhost:5201");
});
