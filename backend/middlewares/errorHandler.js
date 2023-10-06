module.exports.errorHandler = ((err, req, res, next) => {
  console.dir(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'на сервере произошла ошибка'
      : message,
  });
  next();
});
