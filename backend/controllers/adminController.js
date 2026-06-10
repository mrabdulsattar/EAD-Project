const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

const adminController = {
  // Dashboard Stats
  getDashboardStats: async (req, res, next) => {
    try {
      const [
        totalUsers,
        totalHotels,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        rejectedBookings,
        checkedInBookings,
        completedBookings,
        cancelledBookings,
      ] = await Promise.all([
        User.countDocuments(),
        Hotel.countDocuments(),
        Booking.countDocuments(),
        Booking.countDocuments({ status: 'pending' }),
        Booking.countDocuments({ status: 'confirmed' }),
        Booking.countDocuments({ status: 'rejected' }),
        Booking.countDocuments({ status: 'checked-in' }),
        Booking.countDocuments({ status: 'completed' }),
        Booking.countDocuments({ status: 'cancelled' }),
      ]);

      const revenueResult = await Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'checked-in', 'completed'] } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
      ]);

      const totalRevenue = revenueResult[0]?.totalRevenue || 0;

      const recentBookings = await Booking.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('user', 'name email')
        .populate('hotel', 'name location');

      const bookingsByStatus = {
        pending: pendingBookings,
        confirmed: confirmedBookings,
        rejected: rejectedBookings,
        'checked-in': checkedInBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
      };

      // Revenue by month (last 12 months)
      const revenueByMonth = await Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'checked-in', 'completed'] } } },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: '$createdAt' },
            },
            revenue: { $sum: '$totalPrice' },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 12 },
      ]);

      res.status(200).json({
        success: true,
        message: 'Admin dashboard stats loaded',
        data: {
          totalHotels,
          totalUsers,
          totalBookings,
          totalRevenue,
          recentBookings,
          bookingsByStatus,
          revenueByMonth,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // User Management
  getAllUsers: async (req, res, next) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
      let query = {};

      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const skip = (page - 1) * limit;
      const users = await User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await User.countDocuments(query);

      res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: users,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select('-password');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const bookings = await Booking.find({ user: req.params.id })
        .populate('hotel', 'name location')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: { user, bookings },
      });
    } catch (error) {
      next(error);
    }
  },

  updateUserStatus: async (req, res, next) => {
    try {
      const { status } = req.body;

      if (!['active', 'blocked'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({
        success: true,
        message: 'User status updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  updateUserRole: async (req, res, next) => {
    try {
      const { role } = req.body;

      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role' });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Booking Management
  getAllBookings: async (req, res, next) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      let query = {};

      if (status) {
        query.status = status;
      }

      const skip = (page - 1) * limit;
      const bookings = await Booking.find(query)
        .populate('user', 'name email')
        .populate('hotel', 'name location price')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Booking.countDocuments(query);

      res.status(200).json({
        success: true,
        message: 'Bookings fetched successfully',
        data: bookings,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateBookingStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      const validStatuses = ['pending', 'confirmed', 'rejected', 'checked-in', 'completed', 'cancelled'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      )
        .populate('user', 'name email')
        .populate('hotel', 'name location');

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Booking status updated successfully',
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteBooking: async (req, res, next) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Booking deleted successfully',
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  },

  // Hotel Admin Endpoints
  createHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Hotel created successfully',
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },

  updateHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Hotel not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Hotel updated successfully',
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },

  patchHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Hotel not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Hotel updated successfully',
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findByIdAndDelete(req.params.id);

      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Hotel not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Hotel deleted successfully',
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminController;
