const CustomError = require('./CustomError');
const { CONFLICT_ERR } = require('../../statusCodes');
const { CONFLICT_MSG } = require('../../statusMessages');

class ConflictError extends CustomError {
  constructor(message = CONFLICT_MSG) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = CONFLICT_ERR;
  }
}

module.exports = ConflictError;
