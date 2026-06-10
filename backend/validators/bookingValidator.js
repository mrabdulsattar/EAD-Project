const { body } = require('express-validator');

const BOOKING_STATUSES = ['pending', 'confirmed', 'rejected', 'checked-in', 'completed', 'cancelled'];

const createBookingValidator = [
  body('hotel').notEmpty().withMessage('Hotel ID is required'),
  body('checkIn').notEmpty().withMessage('checkIn is required'),
  body('checkOut').notEmpty().withMessage('checkOut is required'),
  body('guests').isInt({ min: 1 }).withMessage('Guests must be at least 1'),
  body('totalPrice').optional().isFloat({ min: 0 }).withMessage('Total price must be a non-negative number'),
  body('status').optional().isIn(BOOKING_STATUSES).withMessage('Invalid booking status'),
];

const patchBookingValidator = [
  body('hotel').optional().notEmpty().withMessage('Hotel ID cannot be empty'),
  body('checkIn').optional().notEmpty().withMessage('checkIn cannot be empty'),
  body('checkOut').optional().notEmpty().withMessage('checkOut cannot be empty'),
  body('guests').optional().isInt({ min: 1 }).withMessage('Guests must be at least 1'),
  body('totalPrice').optional().isFloat({ min: 0 }).withMessage('Total price must be a non-negative number'),
  body('status').optional().isIn(BOOKING_STATUSES).withMessage('Invalid booking status'),
];

module.exports = { createBookingValidator, patchBookingValidator, bookingValidator: createBookingValidator };
