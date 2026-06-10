const express = require('express');
const hotelController = require('../controllers/hotelController');
const { hotelValidator } = require('../validators/hotelValidator');
const validateMiddleware = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// ✅ Specific routes MUST come before /:id — otherwise Express matches
// "countries" as an id param and the DB throws a CastError → 500
router.get('/search',    hotelController.searchHotels);
router.get('/countries', hotelController.getCountries);   // ← NEW

router.get('/',    hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);

router.post('/',    authMiddleware, adminMiddleware, hotelValidator, validateMiddleware, hotelController.createHotel);
router.put('/:id',  authMiddleware, adminMiddleware, hotelValidator, validateMiddleware, hotelController.updateHotel);
router.patch('/:id',authMiddleware, adminMiddleware, hotelValidator, validateMiddleware, hotelController.patchHotel);
router.delete('/:id',authMiddleware, adminMiddleware, hotelController.deleteHotel);

module.exports = router;