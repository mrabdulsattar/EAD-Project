// ========== ADD THESE 2 LINES AT THE VERY TOP ==========
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.8']);
// =======================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const countriesRoutes = require('./routes/countriesRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { assignUniqueImagesToHotels } = require('./utils/hotelImages');
const Hotel = require('./models/Hotel');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow credentials
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auto-seed admin on startup
const seedAdminOnStartup = async () => {
  try {
    const DEFAULT_ADMIN_EMAIL = 'admin@hotelhub.com';
    const DEFAULT_ADMIN_PASSWORD = 'Admin@123';

    const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN_EMAIL });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: DEFAULT_ADMIN_EMAIL,
        password: DEFAULT_ADMIN_PASSWORD,
        role: 'admin',
        status: 'active',
      });
      console.log(`✓ Created default admin: ${DEFAULT_ADMIN_EMAIL}`);
    }
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  }
};

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'FindStays API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/hotels/countries', countriesRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorMiddleware);

// Connect to DB and start server
connectDB().then(async () => {
  seedAdminOnStartup();
  try {
    const duplicates = await Hotel.aggregate([
      { $group: { _id: '$image', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $limit: 1 },
    ]);
    if (duplicates.length > 0) {
      const { updated, total } = await assignUniqueImagesToHotels(Hotel);
      console.log(`✓ Assigned unique images to ${updated}/${total} hotels`);
    }
  } catch (err) {
    console.error('Hotel image assignment skipped:', err.message);
  }
  app.listen(PORT, () => {
    console.log(`✓ FindStays API running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error.message);
  process.exit(1);
});