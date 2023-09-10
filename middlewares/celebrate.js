const { celebrate, Joi } = require('celebrate');

const regExpURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;

const validateNewUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    movieID: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regExpURL),
    image: Joi.string().required().pattern(regExpURL),
    trailerLink: Joi.string().required().pattern(regExpURL),
    year: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
  }),
});

const validateDelMovieID = celebrate({
  params: Joi.object().keys({
    movieID: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateNewUser,
  validateLogin,
  validateUpdUserInfo,
  validateNewMovie,
  validateDelMovieID,
};
