require('dotenv').config({ path: './key.env' });

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./utils/errors/errorHandler');

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
