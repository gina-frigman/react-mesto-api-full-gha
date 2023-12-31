const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('проблемы с авторизацией'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  if (!token) {
    next(new UnauthorizedError('проблемы с авторизацией'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key');
  } catch (err) {
    next(new UnauthorizedError('проблемы с авторизацией'));
  }

  req.user = payload;
  next();
};
