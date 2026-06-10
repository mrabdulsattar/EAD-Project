const { body } = require('express-validator');

const hotelValidator = [
  body('name').trim().notEmpty().withMessage('Hotel name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),

  body('description').trim().notEmpty().withMessage('Description is required'),
  body('pricePerNight').isFloat({ min: 0 }).withMessage('pricePerNight must be a non-negative number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('visitors').optional().isInt({ min: 0 }).withMessage('Visitors must be a non-negative integer'),
  body('facilities').optional().isArray().withMessage('Facilities must be an array of strings'),
];

module.exports = { hotelValidator };
