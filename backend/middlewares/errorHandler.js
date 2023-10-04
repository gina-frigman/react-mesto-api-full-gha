module.exports.errorHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({
    message: statusCode === 500
      ? 'на сервере произошла ошибка'
      : message,
  });
  next();
});
