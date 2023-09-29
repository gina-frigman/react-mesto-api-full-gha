const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { validateCreateUser } = require('../middlewares/validation');
const { validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');

router.post('/sign-up', validateCreateUser, createUser);
router.post('/sign-in', validateLogin, login);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('страницы не существует'));
});

module.exports = router;
