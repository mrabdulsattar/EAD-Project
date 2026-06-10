import { useHotels } from '../context/HotelContext';
import HotelCard from '../components/HotelCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useHotels();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <p className="text-sm text-gray-400 mt-1">{favorites.length} saved hotel{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🤍</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No favorites yet</h3>
          <p className="text-sm text-gray-400 mb-6">Save hotels you love by tapping the heart icon</p>
          <Link to="/search" className="bg-gray-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
            Browse Hotels
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((hotel, i) => (
            <HotelCard key={hotel._id} hotel={hotel} imageIndex={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;