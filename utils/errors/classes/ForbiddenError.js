const CustomError = require('./CustomError');
const { FORBIDDEN_ERR } = require('../../statusCodes');
const { FORBIDDEN_MSG } = require('../../statusMessages');

class ForbiddenError extends CustomError {
  constructor(message = FORBIDDEN_MSG) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_ERR;
  }
}

module.exports = ForbiddenError;
