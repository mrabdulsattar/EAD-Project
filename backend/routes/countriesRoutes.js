const express = require('express');
const Hotel = require('../models/Hotel');

const router = express.Router();

const { COUNTRIES } = require('../utils/countries');

// Returns full list of countries
router.get('/', async (req, res, next) => {
  try {
    const countries = Array.isArray(COUNTRIES) ? COUNTRIES : [];
    res.status(200).json({ success: true, data: countries.slice().sort() });
  } catch (err) {
    next(err);
  }
});


module.exports = router;

