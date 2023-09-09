const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const errorCatcher = require('../utils/errors/errorCatcher');
const NotFoundError = require('../utils/errors/classes/NotFoundError');
const { CREATED } = require('../utils/statusCodes');

const createUser = errorCatcher(async (req, res) => {
  const {
    email, password, name,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email, password: hash, name,
  });
  res.status(CREATED).send({
    _id: user._id,
    email: user.email,
    name: user.name,
  });
});

const login = errorCatcher(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByCredentials(email, password);
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    { expiresIn: '7d' },
  );
  res
    .cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: 'Вы успешно авторизованы' });
});

const logout = (_req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Выход из аккаунта выполнен' });
};

const getCurrentUser = errorCatcher(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

const updateUserInfo = errorCatcher(async (req, res) => {
  const { email, name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new NotFoundError();
  }
  res.send(user);
});

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
  updateUserInfo,
};
