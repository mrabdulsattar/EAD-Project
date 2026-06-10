const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', favoriteController.getFavorites);
router.post('/:hotelId', favoriteController.addFavorite);
router.delete('/:hotelId', favoriteController.removeFavorite);

module.exports = router;
