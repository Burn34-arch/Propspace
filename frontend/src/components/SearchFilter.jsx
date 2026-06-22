import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const PROPERTY_TYPES = ['', 'Apartment', 'House', 'Studio'];
const LISTING_TYPES = [
  { value: '', label: 'Buy or Rent' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

export default function SearchFilter({ onSearch, loading }) {
  const [filters, setFilters] = useState({
    city: '', minPrice: '', maxPrice: '', propertyType: '', listingType: '',
  });

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
    onSearch(clean);
  };

  const handleReset = () => {
    setFilters({ city: '', minPrice: '', maxPrice: '', propertyType: '', listingType: '' });
    onSearch({});
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-gold-500" />
        <span className="font-semibold text-navy-800 text-sm">Filter Properties</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* City */}
        <div className="lg:col-span-1">
          <input
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="City..."
            className="input-field text-sm"
          />
        </div>
        {/* Type */}
        <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="input-field text-sm">
          <option value="">All Types</option>
          {PROPERTY_TYPES.slice(1).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {/* Listing */}
        <select name="listingType" value={filters.listingType} onChange={handleChange} className="input-field text-sm">
          {LISTING_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {/* Price Range */}
        <div className="flex gap-2">
          <input name="minPrice" type="number" value={filters.minPrice} onChange={handleChange} placeholder="Min $" className="input-field text-sm" min="0" />
          <input name="maxPrice" type="number" value={filters.maxPrice} onChange={handleChange} placeholder="Max $" className="input-field text-sm" min="0" />
        </div>
        {/* Actions */}
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-sm py-2.5">
            <Search className="w-4 h-4" />
            Search
          </button>
          {hasFilters && (
            <button type="button" onClick={handleReset} className="p-2.5 rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
