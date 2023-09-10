const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const { validateNewUser, validateLogin } = require('../middlewares/celebrate');

router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateLogin, login);
router.get('/signout', logout);

module.exports = router;
