import HotelCard from './HotelCard';

const HotelList = ({ hotels = [], loading = false, title, subtitle }) => {
  const skeletons = Array(6).fill(null);

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      )}

      {!loading && hotels.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🏨</div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No hotels found</h3>
          <p className="text-sm text-gray-400">Try adjusting your search filters</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? skeletons.map((_, i) => <HotelCard key={i} skeleton />)
          : hotels.map((hotel, i) => <HotelCard key={hotel._id} hotel={hotel} imageIndex={i} />)
        }
      </div>
    </div>
  );
};

export default HotelList;