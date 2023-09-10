const CustomError = require('./classes/CustomError');
const DefaultError = require('./classes/DefaultError');
const BadRequestError = require('./classes/BadRequestError');
const ConflictError = require('./classes/ConflictError');
const { NOT_FOUND_MSG, INVALID_DATA } = require('../statusMessages');

function errorCatcher(fn) {
  return (req, res, next) => {
    fn(req, res, next)
      .catch((err) => {
        const { code, name } = err;
        if (err instanceof CustomError) {
          next(err);
          return;
        }
        if (code === 11000) {
          next(new ConflictError());
          return;
        }
        if (name === 'ValidationError') {
          next(new BadRequestError(INVALID_DATA));
          return;
        }
        if (name === 'CastError') {
          next(new BadRequestError(NOT_FOUND_MSG));
          return;
        }
        next(new DefaultError());
      });
  };
}

module.exports = errorCatcher;
