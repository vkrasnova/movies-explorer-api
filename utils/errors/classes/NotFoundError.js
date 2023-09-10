const CustomError = require('./CustomError');
const { NOT_FOUND_ERR } = require('../../statusCodes');
const { NOT_FOUND_MSG } = require('../../statusMessages');

class NotFoundError extends CustomError {
  constructor(message = NOT_FOUND_MSG) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND_ERR;
  }
}

module.exports = NotFoundError;
