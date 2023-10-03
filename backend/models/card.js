const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator(link) {
        validator.isURL(link, {
          protocols: ['http', 'https'],
        });
      },
      message: 'неверно указана ссылка',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
