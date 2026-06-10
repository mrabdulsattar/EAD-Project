import { Link } from 'react-router-dom';
import { useHotels } from '../context/HotelContext';
import { getHotelCardImage, handleHotelImageError } from '../utils/hotelImages';

const StarRating = ({ rating = 0 }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-2xl h-52 w-full mb-3" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/3" />
  </div>
);

const HotelCard = ({ hotel, skeleton = false, imageIndex = null }) => {
  const { toggleFavorite, isFavorite } = useHotels();

  if (skeleton) return <SkeletonCard />;

  const favorited = isFavorite(hotel._id);

  const displayImage = getHotelCardImage(hotel, imageIndex);

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden mb-3 h-52 bg-gray-100">
        <img
          src={displayImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => handleHotelImageError(e, hotel, imageIndex)}
        />
        {/* Favorite button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(hotel); }}
          className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <svg
            className={`w-4 h-4 ${favorited ? 'text-red-500 fill-red-500' : 'text-gray-400 fill-none'}`}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        {/* Price badge */}
        {hotel.pricePerNight && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
            <span className="text-xs font-semibold text-gray-900">${hotel.pricePerNight}<span className="text-gray-400 font-normal">/night</span></span>
          </div>
        )}
      </div>

      <Link to={`/hotels/${hotel._id}`}>
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-0.5 group-hover:text-gray-600 transition-colors">{hotel.name}</h3>
        <p className="text-sm text-gray-400 mb-1.5">{hotel.location || hotel.address}</p>
        <div className="flex items-center gap-2">
          <StarRating rating={hotel.rating} />
          <span className="text-xs text-gray-400">({hotel.reviews || hotel.numReviews || 0} Visitors)</span>
        </div>
      </Link>
    </div>
  );
};

export { SkeletonCard };
export default HotelCard;