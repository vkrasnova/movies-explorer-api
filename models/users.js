const { Schema, model } = require('mongoose');
const { compare } = require('bcryptjs');
const UnauthorizedError = require('../utils/errors/classes/UnauthorizedError');
const { STRING_REQUIRED, VALID_EMAIL } = require('../utils/schemaOptions');
const { INVALID_EMAIL_OR_PASS } = require('../utils/statusMessages');

const userSchema = new Schema(
  {
    email: {
      ...STRING_REQUIRED,
      ...VALID_EMAIL,
      unique: true,
    },
    password: {
      ...STRING_REQUIRED,
      select: false,
    },
    name: {
      ...STRING_REQUIRED,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_EMAIL_OR_PASS));
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_EMAIL_OR_PASS));
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
