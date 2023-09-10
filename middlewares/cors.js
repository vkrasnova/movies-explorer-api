const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'http://movies-x.ru',
    'https://movies-x.ru',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};

module.exports = cors(options);
