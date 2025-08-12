const express = require("express");
// create a express router
const router = express.Router();

const {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
} = require("../controllers/tvshow");

// GET / - list all the shows
router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  res.send(await getTvshows(genre, rating, premiere_year));
});

// GET /:id - get a specific show
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;

  res.send(await getTvshow(id));
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

    res
      .status(200)
      .send(
        await addTvshow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
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

    res
      .status(200)
      .send(
        await updateTvshow(
          id,
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

// DELETE /:id - delete tvshow
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTvshow(id);

    res.status(200).send({
      message: `Tv show with the ID of ${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
