const { isURL, isEmail } = require('validator');
const { INVALID_URL, INVALID_EMAIL } = require('./statusMessages');

const NUMBER_REQUIRED = {
  type: Number,
  required: true,
};

const STRING_REQUIRED = {
  type: String,
  required: true,
};

const VALID_URL = {
  validate: {
    validator: isURL,
    message: INVALID_URL,
  },
};

const VALID_EMAIL = {
  validate: {
    validator: isEmail,
    message: INVALID_EMAIL,
  },
};

module.exports = {
  NUMBER_REQUIRED,
  STRING_REQUIRED,
  VALID_URL,
  VALID_EMAIL,
};
