const mongoose = require('mongoose');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
require('dotenv').config();

const COUNTRIES = ['United States', 'United Kingdom', 'France', 'Japan', 'Australia'];

const HOTEL_NAMES = {
  'United States': ['The Plaza', 'Ritz Carlton', 'Starwood', 'Hilton Grand', 'Mandarin Oriental', 'Park Hyatt', 'The Peninsula', 'Belmond', 'Four Seasons', 'Rosewood', 'Aman', 'St. Regis', 'The Langham', 'Fairmont', 'JW Marriott', 'Waldorf Astoria', 'InterContinental', 'The Luxury Collection', 'Taj Hotels', 'Oberoi'],
  'United Kingdom': ['Claridge\'s', 'The Dorchester', 'The Savoy', 'The Ritz', 'Connaught', 'Brown\'s', 'Rosewood London', 'St. Pancras Renaissance', 'The Landmark', 'Sofitel London', 'Great Northern', 'Goring', 'Milestone', 'Athenaeum', 'Chesterfield', 'Four Seasons London', 'Mandarin Oriental London', 'The Berkeley', ' Claridge\'s', 'Berkeley'],
  'France': ['Le Meurice', 'Hôtel de Crillon', 'Le Bristol', 'Plaza Athénée', 'Ritz Paris', 'Four Seasons Paris', 'Mandarin Oriental Paris', 'Hyatt Paris', 'Lutetia', 'Le Marais', 'Thoumieux', 'Félicien', 'Bel Ami', 'Aubusson', 'Invalides', 'Montalembert', 'La Réserve', 'Astoria', 'Vendôme', 'Cambon'],
  'Japan': ['Peninsula Tokyo', 'Aman Tokyo', 'Mandarin Oriental Tokyo', 'Park Hyatt Tokyo', 'Ritz-Carlton Tokyo', 'Hilton Tokyo', 'Shinjuku Prince', 'Hyatt Regency Tokyo', 'Imperial Hotel', 'Hotel New Otani', 'ANA InterContinental', 'Keio Plaza', 'Westin Tokyo', 'Grand Metropolitan', 'Marunouchi', 'Palace Hotel Tokyo', 'Ginza Dai-Ichi', 'Hotel Gracery', 'Mitsui Garden', 'Kabuki'],
  'Australia': ['Park Hyatt Sydney', 'Four Seasons Sydney', 'Shangri-La Sydney', 'The Rocks Boutique', 'Reef Resort Cairns', 'Quay Grand', 'Hilton Sydney', 'Sofitel Sydney', 'InterContinental Sydney', 'Golden Sand', 'Coral Sea', 'Dockside Green', 'Crown Metropol', 'Ovolo', 'Establishment', 'MG Apartments', 'Pier One', 'Pullman', 'Accor', 'Novotel'],
};

const CITIES_BY_COUNTRY = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Edinburgh'],
  'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Sapporo', 'Fukuoka', 'Nagoya', 'Kobe', 'Kawasaki', 'Saitama'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart', 'Cairns', 'Darwin'],
};

const FACILITIES = [
  'Free WiFi', 'Swimming Pool', 'Fitness Center', 'Restaurant', 'Bar & Lounge', 'Spa',
  'Valet Parking', 'Concierge Service', 'Business Center', 'Room Service', 'Coffee Shop',
  'Banquet Hall', 'Laundry Service', 'Travel Desk', 'Currency Exchange', 'Game Room',
  'Library', 'Rooftop Terrace', 'Garden', 'Sauna', 'Yoga Studio',
];

const DESCRIPTIONS = [
  'Experience luxury and comfort with world-class amenities and exceptional service.',
  'A premier destination offering elegance, sophistication, and unforgettable experiences.',
  'Discover the perfect blend of modern comfort and timeless elegance in our beautiful property.',
  'Your home away from home, featuring stunning views and impeccable hospitality.',
  'Exceptional accommodations with premium services and state-of-the-art facilities.',
  'An ideal retreat for business travelers and leisure visitors alike.',
  'Immerse yourself in luxury with our spacious rooms and top-notch amenities.',
  'Experience ultimate relaxation in our award-winning hotel with premium services.',
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/findstays';
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB');

    await User.deleteMany({});
    await Hotel.deleteMany({});
    console.log('✓ Cleared existing data');

    const adminEmail = 'admin@hotelhub.com';
    const admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: 'Admin@123',
      role: 'admin',
      status: 'active',
    });
    console.log(`✓ Created admin user: ${admin.email}`);

    const { HOTEL_IMAGE_POOL } = require('./utils/hotelImages');
    const shuffledImages = [...HOTEL_IMAGE_POOL].sort(() => Math.random() - 0.5);
    let imageIndex = 0;
    let totalHotels = 0;

    for (const country of COUNTRIES) {
      const hotels = [];
      const hotelNames = HOTEL_NAMES[country] || [];
      const cities = CITIES_BY_COUNTRY[country] || [];

      for (let i = 0; i < 20; i++) {
        const nameIndex = i % hotelNames.length;
        const cityIndex = i % cities.length;
        const descIndex = i % DESCRIPTIONS.length;
        const facilityCount = 5 + Math.floor(Math.random() * 4);
        const selectedFacilities = FACILITIES.sort(() => Math.random() - 0.5).slice(0, facilityCount);

        hotels.push({
          name: `${hotelNames[nameIndex]} ${i + 1}`,
          location: cities[cityIndex],
          country,
          address: `${(i + 1) * 100} ${cities[cityIndex]} Street, ${country}`,
          image: shuffledImages[imageIndex % shuffledImages.length],
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          visitors: Math.floor(100 + Math.random() * 10000),
          description: DESCRIPTIONS[descIndex],
          facilities: selectedFacilities,
          pricePerNight: Math.floor(50 + Math.random() * 450),
        });
        imageIndex++;
      }

      const created = await Hotel.insertMany(hotels);
      console.log(`✓ Seeded ${created.length} hotels in ${country}`);
      totalHotels += created.length;
    }

    console.log('\n✓ Database seeding completed successfully!');
    console.log(`✓ Total hotels seeded: ${totalHotels}`);
    console.log(`✓ Default admin: admin@hotelhub.com / Admin@123`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
