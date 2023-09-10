const CustomError = require('./CustomError');
const { UNAUTHORIZED_ERR } = require('../../statusCodes');
const { UNAUTHORIZED_MSG } = require('../../statusMessages');

class UnauthorizedError extends CustomError {
  constructor(message = UNAUTHORIZED_MSG) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNAUTHORIZED_ERR;
  }
}

module.exports = UnauthorizedError;
