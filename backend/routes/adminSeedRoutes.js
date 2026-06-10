const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin-only: seeds an admin account (if missing) + creates hotels for each country.
router.post('/seed-hotels', authMiddleware, adminMiddleware, adminController.seedHotels);

module.exports = router;

