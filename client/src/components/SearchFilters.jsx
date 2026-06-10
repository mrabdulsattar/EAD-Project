import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHotels } from '../context/HotelContext';

const SearchFilters = ({ onSearch, compact = false }) => {
  const { filters, setFilters, fetchHotels, hotels } = useHotels();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [local, setLocal] = useState({
    location: filters.location || '',
    country: filters.country || searchParams.get('country') || '',
    persons: filters.persons || 1,
    checkIn: filters.checkIn || '',
    checkOut: filters.checkOut || '',
    name: filters.name || '',
  });

  useEffect(() => {
    setLocal((prev) => ({
      ...prev,
      location: filters.location || '',
      country: filters.country || searchParams.get('country') || '',
      persons: filters.persons || 1,
      checkIn: filters.checkIn || '',
      checkOut: filters.checkOut || '',
      name: filters.name || '',
    }));
  }, [filters, searchParams]);

  // Extract unique countries from hotels
  const countries = [...new Set(hotels.map(h => h.country || 'Other'))].sort();

  const update = (key, val) => setLocal((p) => ({ ...p, [key]: val }));

  const handleSearch = () => {
    setFilters({ ...filters, ...local });
    fetchHotels(local);
    if (!compact) navigate('/search');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={`bg-white ${compact ? 'rounded-xl shadow-sm border border-gray-100' : 'shadow-md rounded-2xl'} px-4 py-4`}>
      <div className="flex flex-wrap items-end gap-3">
        {/* Location */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Location</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Jakarta, IND"
              value={local.location}
              onChange={(e) => update('location', e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Country */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Country</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4h.01M3 3h18"/>
            </svg>
            <select
              value={local.country}
              onChange={(e) => update('country', e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none w-full"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Persons */}
        <div className="flex-1 min-w-[110px]">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Person</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <select
              value={local.persons}
              onChange={(e) => update('persons', Number(e.target.value))}
              className="bg-transparent text-sm text-gray-700 outline-none w-full"
            >
              {[1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Persons'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Check-in</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <input
              type="date"
              min={today}
              value={local.checkIn}
              onChange={(e) => update('checkIn', e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none w-full"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Check-out</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 hover:border-gray-300 transition-colors">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <input
              type="date"
              min={local.checkIn || today}
              value={local.checkOut}
              onChange={(e) => update('checkOut', e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none w-full"
            />
          </div>
        </div>

        {/* Hotel name */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Find specific hotel</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 hover:border-gray-300 transition-colors">
            <input
              type="text"
              placeholder="Ex. Ibis Hotel"
              value={local.name}
              onChange={(e) => update('name', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors flex-shrink-0 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;