const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const { createBookingValidator, patchBookingValidator } = require('../validators/bookingValidator');
const validateMiddleware = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', createBookingValidator, validateMiddleware, bookingController.createBooking);
router.put('/:id', patchBookingValidator, validateMiddleware, bookingController.updateBooking);
router.patch('/:id', patchBookingValidator, validateMiddleware, bookingController.patchBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
