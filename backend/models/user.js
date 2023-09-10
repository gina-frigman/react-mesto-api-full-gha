const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'минимальное количество символов: 2'],
    maxlength: [30, 'максимальное количество символов: 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'минимальное количество символов: 2'],
    maxlength: [30, 'максимальное количество символов: 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        validator.isURL(link, {
          protocols: ['http', 'https'],
        });
      },
      message: 'неверно указана ссылка',
    },
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'поле обязательно для заполнения'],
    validate: {
      validator(email) {
        validator.isEmail(email);
      },
      message: 'неверно указан email',
    },
  },
  password: {
    type: String,
    required: [true, 'поле обязательно для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('проблемы с авторизацией'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('проблемы с авторизацией'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
