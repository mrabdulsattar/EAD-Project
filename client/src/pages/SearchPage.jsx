import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHotels } from '../context/HotelContext';
import SearchFilters from '../components/SearchFilters';
import HotelList from '../components/HotelList';

const SearchPage = () => {
  const { hotels, loading, fetchHotels, filters, setFilters } = useHotels();
  const [searchParams] = useSearchParams();
  const countryParam = searchParams.get('country');

  useEffect(() => {
    if (countryParam) {
      setFilters((prev) => ({ ...prev, country: countryParam }));
      fetchHotels({ country: countryParam });
    } else {
      fetchHotels();
    }
  }, [countryParam, fetchHotels, setFilters]);

  const locationLabel = filters.country
    ? `Hotels in ${filters.country}`
    : filters.location
    ? `Hotels in ${filters.location}`
    : 'All Hotels';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search bar */}
      <div className="mb-8">
        <SearchFilters compact />
      </div>

      {/* Results */}
      <HotelList
        hotels={hotels}
        loading={loading}
        title={locationLabel}
        subtitle={loading ? 'Searching...' : `We found ${hotels.length} Premium Hotels`}
      />
    </div>
  );
};

export default SearchPage;