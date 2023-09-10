const CustomError = require('./CustomError');
const { BAD_REQUEST_ERR } = require('../../statusCodes');
const { BAD_REQUEST_MSG } = require('../../statusMessages');

class BadRequestError extends CustomError {
  constructor(message = BAD_REQUEST_MSG) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = BAD_REQUEST_ERR;
  }
}

module.exports = BadRequestError;
