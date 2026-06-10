const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

const bookingController = {
  getAllBookings: async (req, res, next) => {
    try {
      const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
      const bookings = await Booking.find(filter)
        .populate('user', '-password')
        .populate('hotel')
        .sort({ createdAt: -1 });

      res.status(200).json({ success: true, message: 'Bookings fetched successfully', data: bookings });
    } catch (error) {
      next(error);
    }
  },

  getBookingById: async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate('user', '-password')
        .populate('hotel');

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      res.status(200).json({ success: true, message: 'Booking fetched successfully', data: booking });
    } catch (error) {
      next(error);
    }
  },

  createBooking: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.body.hotel);
      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Hotel not found' });
      }

      const checkIn = new Date(req.body.checkIn);
      const checkOut = new Date(req.body.checkOut);
      const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
      const totalPrice = req.body.totalPrice || hotel.pricePerNight * nights;

      const booking = await Booking.create({
        user: req.user._id,
        hotel: req.body.hotel,
        checkIn,
        checkOut,
        guests: req.body.guests || 1,
        totalPrice,
        status: req.body.status || 'pending',
      });

      const populatedBooking = await Booking.findById(booking._id).populate('user', '-password').populate('hotel');
      res.status(201).json({ success: true, message: 'Booking created successfully', data: populatedBooking });
    } catch (error) {
      next(error);
    }
  },

  updateBooking: async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .populate('user', '-password')
        .populate('hotel');

      res.status(200).json({ success: true, message: 'Booking updated successfully', data: updatedBooking });
    } catch (error) {
      next(error);
    }
  },

  patchBooking: async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .populate('user', '-password')
        .populate('hotel');

      res.status(200).json({ success: true, message: 'Booking updated successfully', data: updatedBooking });
    } catch (error) {
      next(error);
    }
  },

  deleteBooking: async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Booking deleted successfully', data: booking });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bookingController;
