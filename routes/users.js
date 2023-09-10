const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { validateUpdUserInfo } = require('../middlewares/celebrate');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdUserInfo, updateUserInfo);

module.exports = router;
