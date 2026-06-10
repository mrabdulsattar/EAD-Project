import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountryCarousel = ({ hotelsByCountry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const countries = Object.keys(hotelsByCountry);

  const countryEmojis = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'France': '🇫🇷',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
    'Canada': '🇨🇦',
    'Germany': '🇩🇪',
    'Italy': '🇮🇹',
    'Spain': '🇪🇸',
    'Mexico': '🇲🇽',
  };

  const countryImages = {
    'United States': 'https://images.unsplash.com/photo-1489749798305-4fba8393e7a0?w=800&h=400&fit=crop',
    'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop',
    'France': 'https://images.unsplash.com/photo-1494499821127-cbf40ec45900?w=800&h=400&fit=crop',
    'Japan': 'https://images.unsplash.com/photo-1540959375944-7049f642e9a4?w=800&h=400&fit=crop',
    'Australia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'Canada': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'Germany': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
    'Italy': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
  };

  useEffect(() => {
    if (countries.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % countries.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [countries.length]);

  if (countries.length === 0) return null;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + countries.length) % countries.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % countries.length);
  };

  // Show up to 3 countries at a time
  const visibleCountries = [];
  for (let i = 0; i < 3 && i < countries.length; i++) {
    visibleCountries.push(countries[(currentSlide + i) % countries.length]);
  }

  return (
    <div className="mb-20">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Explore Popular Destinations</h2>
        <p className="text-gray-600">Discover amazing hotels in the world's most beautiful cities</p>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleCountries.map((country) => (
            <Link
              key={country}
              to={`/search?country=${encodeURIComponent(country)}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={countryImages[country] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop'}
                alt={country}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{countryEmojis[country] || '🌍'}</span>
                  <h3 className="text-2xl font-bold">{country}</h3>
                </div>
                <p className="text-gray-100 text-sm">
                  {hotelsByCountry[country].length} hotels available
                </p>
              </div>

              {/* Hover Badge */}
              <div className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Controls */}
        {countries.length > 3 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="bg-white border border-gray-300 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {countries.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-gray-900 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-white border border-gray-300 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCarousel;
