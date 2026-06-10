const Favorite = require('../models/Favorite');
const Hotel = require('../models/Hotel');

const favoriteController = {
  getFavorites: async (req, res, next) => {
    try {
      const favorites = await Favorite.find({ user: req.user._id }).populate('hotel').sort({ createdAt: -1 });
      res.status(200).json({ success: true, message: 'Favorites fetched successfully', data: favorites });
    } catch (error) {
      next(error);
    }
  },

  addFavorite: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.hotelId);
      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Hotel not found' });
      }

      const favorite = await Favorite.findOneAndUpdate(
        { user: req.user._id, hotel: req.params.hotelId },
        { user: req.user._id, hotel: req.params.hotelId },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      res.status(201).json({ success: true, message: 'Hotel added to favorites', data: favorite });
    } catch (error) {
      next(error);
    }
  },

  removeFavorite: async (req, res, next) => {
    try {
      const favorite = await Favorite.findOneAndDelete({ user: req.user._id, hotel: req.params.hotelId });
      if (!favorite) {
        return res.status(404).json({ success: false, message: 'Favorite not found' });
      }

      res.status(200).json({ success: true, message: 'Favorite removed successfully', data: favorite });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = favoriteController;
