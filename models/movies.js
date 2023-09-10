const { Schema, model } = require('mongoose');
const {
  NUMBER_REQUIRED,
  STRING_REQUIRED,
  VALID_URL,
} = require('../utils/schemaOptions');

const movieSchema = new Schema(
  {
    movieID: NUMBER_REQUIRED,
    nameRU: STRING_REQUIRED,
    nameEN: STRING_REQUIRED,
    description: STRING_REQUIRED,

    thumbnail: {
      ...STRING_REQUIRED,
      ...VALID_URL,
    },
    image: {
      ...STRING_REQUIRED,
      ...VALID_URL,
    },
    trailerLink: {
      ...STRING_REQUIRED,
      ...VALID_URL,
    },

    year: STRING_REQUIRED,
    country: STRING_REQUIRED,
    director: STRING_REQUIRED,
    duration: NUMBER_REQUIRED,

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = model('movie', movieSchema);
