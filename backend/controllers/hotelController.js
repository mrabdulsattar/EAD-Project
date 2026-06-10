const Hotel = require('../models/Hotel');

const hotelController = {
  getAllHotels: async (req, res, next) => {
    try {
      const hotels = await Hotel.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, message: 'Hotels fetched successfully', data: hotels });
    } catch (error) {
      next(error);
    }
  },

  getHotelById: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.status(200).json({ success: true, message: 'Hotel fetched successfully', data: hotel });
    } catch (error) {
      next(error);
    }
  },

  createHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.create(req.body);
      res.status(201).json({ success: true, message: 'Hotel created successfully', data: hotel });
    } catch (error) {
      next(error);
    }
  },

  updateHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.status(200).json({ success: true, message: 'Hotel updated successfully', data: hotel });
    } catch (error) {
      next(error);
    }
  },

  patchHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.status(200).json({ success: true, message: 'Hotel updated successfully', data: hotel });
    } catch (error) {
      next(error);
    }
  },

  deleteHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findByIdAndDelete(req.params.id);
      if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
      res.status(200).json({ success: true, message: 'Hotel deleted successfully', data: hotel });
    } catch (error) {
      next(error);
    }
  },

  searchHotels: async (req, res, next) => {
    try {
      const filter = {};
      if (req.query.location) filter.location = { $regex: req.query.location, $options: 'i' };
      if (req.query.country)  filter.country = { $regex: `^${req.query.country}$`, $options: 'i' };
      if (req.query.rating)   filter.rating = { $gte: Number(req.query.rating) };
      if (req.query.price)    filter.pricePerNight = { $lte: Number(req.query.price) };
      if (req.query.name)     filter.name = { $regex: req.query.name, $options: 'i' };

      const hotels = await Hotel.find(filter).sort({ rating: -1 });
      res.status(200).json({ success: true, message: 'Hotels search completed', data: hotels });
    } catch (error) {
      next(error);
    }
  },

  // ✅ NEW — returns distinct countries from all hotel documents
  getCountries: async (req, res, next) => {
    try {
      const countries = await Hotel.distinct('country');
      res.status(200).json({ success: true, message: 'Countries fetched successfully', data: countries });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = hotelController;