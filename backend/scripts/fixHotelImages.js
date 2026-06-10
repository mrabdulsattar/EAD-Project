/**
 * One-time script: assign a unique image to every hotel in the database.
 * Run: node scripts/fixHotelImages.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const { assignUniqueImagesToHotels } = require('../utils/hotelImages');

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/findstays');
  console.log('Connected to MongoDB');

  const { updated, total } = await assignUniqueImagesToHotels(Hotel);
  console.log(`Done — updated ${updated}/${total} hotels with unique images.`);

  const sample = await Hotel.find({ country: 'Peru' }).sort({ name: -1 }).limit(4).select('name image');
  console.log('\nPeru sample (should all differ):');
  sample.forEach((h) => console.log(`  ${h.name}: ${h.image.slice(-40)}`));

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
