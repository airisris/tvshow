const express = require("express");
// create a express router
const router = express.Router();

// import the Movie model
const Tvshow = require("../models/tvshow");

// GET / - list all the shows
router.get("/", async (req, res) => {
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

// GET /:id - get a specific show
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const tvshow = await Tvshow.findById(id);
  res.send(tvshow);
});

/* 
  POST / - add new tvshow
  This POST route need to accept the following parameters:
  - title
  - creator
  - premiere_year
  - end_year
  - seasons
  - genre
  - rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    // create new movie
    const newTvshow = new Tvshow({
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    });
    // save the new movie into MongoDB
    await newTvshow.save(); // clicking the save button

    res.status(200).send(newTvshow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// PUT /:id - update tvshow
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check error - make sure all the fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedTvshow = await Tvshow.findByIdAndUpdate(
      id,
      {
        title: title,
        creator: creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedTvshow);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /:id - delete tvshow
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the tvshow
    await Tvshow.findByIdAndDelete(id);

    res.status(200).send({
      message: `Tv show with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
