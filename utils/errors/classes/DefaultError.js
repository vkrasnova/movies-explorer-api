const { INTERNAL_SERVER_ERR } = require('../../statusCodes');
const { INTERNAL_SERVER_MSG } = require('../../statusMessages');

class DefaultError extends Error {
  constructor(message = INTERNAL_SERVER_MSG) {
    super(message);
    this.isCustom = true;
    this.name = 'DefaultError';
    this.statusCode = INTERNAL_SERVER_ERR;
  }
}

module.exports = DefaultError;
