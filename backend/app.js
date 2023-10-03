const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const { errorHandler } = require('./middlewares/errorHandler');
const { checkCors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(checkCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
module.exports = app;
