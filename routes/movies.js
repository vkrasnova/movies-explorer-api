const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { regExpURL } = require('../utils/validation');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    movieID: Joi
      .number()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
    description: Joi
      .string()
      .required(),
    thumbnail: Joi
      .string()
      .required()
      .pattern(regExpURL),
    image: Joi
      .string()
      .required()
      .pattern(regExpURL),
    trailerLink: Joi
      .string()
      .required()
      .pattern(regExpURL),
    year: Joi
      .string()
      .required(),
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
  }),
}), createMovie);

router.delete('/:movieID', celebrate({
  params: Joi.object().keys({
    movieID: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
}), deleteMovie);

module.exports = router;
