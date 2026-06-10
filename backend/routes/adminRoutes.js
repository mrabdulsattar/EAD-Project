const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { hotelValidator } = require('../validators/hotelValidator');
const validateMiddleware = require('../middleware/validateMiddleware');

const router = express.Router();

// Dashboard
router.get('/dashboard', authMiddleware, adminMiddleware, adminController.getDashboardStats);

// User Management
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, adminController.getUserById);
router.patch('/users/:id/status', authMiddleware, adminMiddleware, adminController.updateUserStatus);
router.patch('/users/:id/role', authMiddleware, adminMiddleware, adminController.updateUserRole);

// Booking Management
router.get('/bookings', authMiddleware, adminMiddleware, adminController.getAllBookings);
router.patch('/bookings/:id', authMiddleware, adminMiddleware, adminController.updateBookingStatus);
router.delete('/bookings/:id', authMiddleware, adminMiddleware, adminController.deleteBooking);

// Hotel Management
router.post('/hotels', authMiddleware, adminMiddleware, hotelValidator, validateMiddleware, adminController.createHotel);
router.put('/hotels/:id', authMiddleware, adminMiddleware, hotelValidator, validateMiddleware, adminController.updateHotel);
router.patch('/hotels/:id', authMiddleware, adminMiddleware, hotelValidator, validateMiddleware, adminController.patchHotel);
router.delete('/hotels/:id', authMiddleware, adminMiddleware, adminController.deleteHotel);

module.exports = router;
