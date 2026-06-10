const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel is required'],
    },
    checkIn: {
      type: Date,
      required: [true, 'checkIn date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'checkOut date is required'],
    },
    guests: {
      type: Number,
      required: [true, 'Guests count is required'],
      min: [1, 'At least 1 guest is required'],
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'checked-in', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

bookingSchema.pre('validate', function () {
  if (this.checkIn && this.checkOut && this.checkOut <= this.checkIn) {
    throw new Error('checkOut must be after checkIn');
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
