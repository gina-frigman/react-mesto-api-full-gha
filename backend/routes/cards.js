const router = require('express').Router();
const {
  getCards, likeCard, dislikeCard, createCard, deleteCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validation');

router.get('/', getCards);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);

module.exports = router;
