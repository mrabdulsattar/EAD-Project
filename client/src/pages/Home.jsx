import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotels } from '../context/HotelContext';
import SearchFilters from '../components/SearchFilters';
import CountryCarousel from '../components/CountryCarousel';
import { getHotelCardImage, handleHotelImageError } from '../utils/hotelImages';

const Home = () => {
  const { hotels, loading, fetchHotels } = useHotels();
  const [hotelsByCountry, setHotelsByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  useEffect(() => {
    if (hotels.length > 0) {
      const grouped = hotels.reduce((acc, hotel) => {
        const country = hotel.country || 'Other';
        if (!acc[country]) {
          acc[country] = [];
        }
        acc[country].push(hotel);
        return acc;
      }, {});
      setHotelsByCountry(grouped);
    }
  }, [hotels]);

  const countryEmojis = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'France': '🇫🇷',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
    'Other': '🌍',
  };

  const countries = Object.keys(hotelsByCountry);
  const displayedHotels = selectedCountry ? hotelsByCountry[selectedCountry] : [];

  // Build a global image index offset per country so no two sections share images
  const countryImageOffsets = {};
  let offset = 0;
  countries.forEach((country) => {
    countryImageOffsets[country] = offset;
    offset += hotelsByCountry[country].length;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <div className="max-w-2xl mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Discover Your Perfect Hotel
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore premium hotels worldwide. Book with confidence, travel with ease.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl">
            <SearchFilters compact={false} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Premium Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{countries.length}</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Countries Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <CountryCarousel hotelsByCountry={hotelsByCountry} />
      </div>

      {/* Featured Hotels Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Hotels</h2>
          <p className="text-gray-600">Browse our collection of premium hotels across the globe</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : countries.length > 0 ? (
          <div className="space-y-16">
            {countries.slice(0, 5).map((country) => (
              <div key={country}>
                {/* Country Header */}
                <div
                  onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                  className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-gray-200 cursor-pointer hover:border-gray-900 transition-colors"
                >
                  <span className="text-4xl">{countryEmojis[country] || '🌍'}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{country}</h3>
                    <p className="text-gray-600">{hotelsByCountry[country].length} hotels available</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-900">
                    <svg className={`w-6 h-6 transition-transform ${selectedCountry === country ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* Hotels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {hotelsByCountry[country].slice(0, 4).map((hotel, imgIndex) => (
                    <Link
                      key={hotel._id}
                      to={`/hotels/${hotel._id}`}
                      className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Hotel Image */}
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={getHotelCardImage(hotel, countryImageOffsets[country] + imgIndex)}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => handleHotelImageError(e, hotel, countryImageOffsets[country] + imgIndex)}
                        />
                        <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 text-sm font-semibold text-gray-900 shadow-md">
                          {hotel.rating?.toFixed(1)} ⭐
                        </div>
                      </div>

                      {/* Hotel Info */}
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {hotel.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{hotel.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">
                            ${hotel.pricePerNight}
                            <span className="text-sm text-gray-600 font-normal">/night</span>
                          </span>
                          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors">
                            ❤️
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {hotelsByCountry[country].length > 4 && (
                  <div className="text-center mb-8">
                    <Link
                      to={`/search?country=${encodeURIComponent(country)}`}
                      className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      View all {country} hotels ({hotelsByCountry[country].length})
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No hotels found</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Stay?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our full collection of premium hotels, read reviews from other travelers, and book your perfect getaway today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore All Hotels
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;