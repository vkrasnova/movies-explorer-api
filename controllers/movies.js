const Movie = require('../models/movies');
const errorCatcher = require('../utils/errors/errorCatcher');
const NotFoundError = require('../utils/errors/classes/NotFoundError');
const ForbiddenError = require('../utils/errors/classes/ForbiddenError');
const { CREATED } = require('../utils/statusCodes');
const { SUCCESS_MSG } = require('../utils/statusMessages');

const getUserMovies = errorCatcher(async (req, res) => {
  const movies = await Movie.find({ owner: req.user._id });
  res.send(movies);
});

const createMovie = errorCatcher(async (req, res) => {
  const movie = await Movie.create({
    ...req.body,
    owner: req.user._id,
  });
  res.status(CREATED).send(movie);
});

const deleteMovie = errorCatcher(async (req, res) => {
  const movie = await Movie.findById(req.params.movieID);
  if (!movie) {
    throw new NotFoundError();
  }
  if (movie.owner.toString() !== req.user._id) {
    throw new ForbiddenError();
  }
  await movie.deleteOne();
  res.send({ message: SUCCESS_MSG });
});

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
