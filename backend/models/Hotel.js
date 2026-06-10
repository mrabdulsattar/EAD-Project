const mongoose = require('mongoose');
const { HOTEL_IMAGE_POOL, getImageForHotel } = require('../utils/hotelImages');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 4.0,
    },
    visitors: {
      type: Number,
      default: 0,
      min: [0, 'Visitors cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    facilities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'pricePerNight is required'],
      min: [0, 'pricePerNight cannot be negative'],
    },
  },
  { timestamps: true }
);

// Pre-save hook: assign a unique image if not provided
hotelSchema.pre('save', async function () {
  if (!this.image || String(this.image).trim().length === 0) {
    const Hotel = mongoose.model('Hotel');
    const count = await Hotel.countDocuments();
    const usedImages = await Hotel.find({}, 'image').lean();
    const usedSet = new Set(usedImages.map((h) => h.image).filter(Boolean));

    const available = HOTEL_IMAGE_POOL.find((img) => !usedSet.has(img));
    this.image = available || getImageForHotel({ _id: this._id }, count);
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
module.exports.HOTEL_IMAGE_POOL = HOTEL_IMAGE_POOL;

