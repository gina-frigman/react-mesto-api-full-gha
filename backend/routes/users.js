const router = require('express').Router();
const {
  findUsers, findUserById, editProfile, editAvatar, showProfileInfo,
} = require('../controllers/users');
const { validateEditProfile, validateEditAvatar, validateUserId } = require('../middlewares/validation');

router.get('/', findUsers);
router.get('/me', showProfileInfo);
router.get('/:userId', validateUserId, findUserById);
router.patch('/me', validateEditProfile, editProfile);
router.patch('/me/avatar', validateEditAvatar, editAvatar);

module.exports = router;
