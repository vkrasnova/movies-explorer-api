const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new Schema(
  {
    movieID: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
        message: 'Некорректная ссылка на мини-постер',
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
        message: 'Некорректная ссылка на постер',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
        message: 'Некорректная ссылка на трейлер',
      },
    },
    year: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('movie', movieSchema);
