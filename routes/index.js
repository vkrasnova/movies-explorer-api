const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/classes/NotFoundError');
const { INVALID_URL_REQUEST } = require('../utils/statusMessages');

router.use('/', require('./auth'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', (_req, _res, next) => {
  next(new NotFoundError(INVALID_URL_REQUEST));
});

module.exports = router;
