const Movie = require('../models/movies');
const errorCatcher = require('../utils/errors/errorCatcher');
const NotFoundError = require('../utils/errors/classes/NotFoundError');
const ForbiddenError = require('../utils/errors/classes/ForbiddenError');
const { CREATED } = require('../utils/statusCodes');

const getMovies = errorCatcher(async (req, res) => {
  const movies = await Movie.find({ owner: req.user._id });
  res.send(movies);
});

const createMovie = errorCatcher(async (req, res) => {
  const {
    movieID,
    nameRU,
    nameEN,
    description,
    thumbnail,
    image,
    trailerLink,
    year,
    country,
    director,
    duration,
  } = req.body;
  const movie = await Movie.create({
    movieID,
    nameRU,
    nameEN,
    description,
    thumbnail,
    image,
    trailerLink,
    year,
    country,
    director,
    duration,
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
    throw new ForbiddenError('Нельзя удалить чужой фильм');
  }
  await movie.deleteOne();
  res.send({ message: 'Фильм удален' });
});

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
