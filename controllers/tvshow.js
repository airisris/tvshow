// import the Tvshow model
const Tvshow = require("../models/tvshow");

async function getTvshows(genre, rating, premiere_year) {
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

  // load the tvshows data from MongoDB
  return await Tvshow.find(filter).sort({ _id: -1 });
}

async function getTvshow(id) {
  // load the tvshow data based on id
  return await Tvshow.findById(id);
}

async function addTvshow(
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  // create new movie
  const newTvshow = new Tvshow({
    title: title, // long method
    creator, // short method
    premiere_year: premiere_year,
    end_year: end_year,
    seasons: seasons,
    genre: genre,
    rating: rating,
  });
  // save the new movie into MongoDB
  await newTvshow.save(); // clicking the save button
  return newTvshow;
}

async function updateTvshow(
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  return await Tvshow.findByIdAndUpdate(
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
}

async function deleteTvshow(id) {
  // delete the tvshow
  return await Tvshow.findByIdAndDelete(id);
}

module.exports = {
  getTvshows,
  getTvshow,
  addTvshow,
  updateTvshow,
  deleteTvshow,
};
