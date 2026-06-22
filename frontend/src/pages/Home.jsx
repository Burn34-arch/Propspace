import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Shield, Search } from 'lucide-react';
import { fetchProperties } from '../api/property.api';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import toast from 'react-hot-toast';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  const loadProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const res = await fetchProperties(filters);
      setProperties(res.data);
    } catch {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
    return () => {};
  }, []);

  const handleSearch = (filters) => {
    setActiveFilters(filters);
    loadProperties(filters);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-navy-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-gold-400" />
              <span className="text-gold-300 text-sm font-medium">Real Estate Marketplace</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
              Find Your<br />
              <span className="text-gold-400">Dream Property</span>
            </h1>
            <p className="text-slate-300 text-xl mb-10 leading-relaxed">
              Browse thousands of apartments, houses, and studios for rent or sale.
              Your perfect space is just a search away.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="#listings" className="btn-gold text-base py-3 px-8 flex items-center gap-2">
                <Search className="w-5 h-5" /> Browse Listings
              </Link>
              <Link to="/register" className="btn-outline text-base py-3 px-8 border-white text-white hover:bg-white hover:text-navy-900">
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { icon: Building2, label: 'Properties Listed', value: properties.length || '—' },
              { icon: TrendingUp, label: 'Active Markets', value: 'Global' },
              { icon: Shield, label: 'Secure Transactions', value: 'JWT Secured' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex justify-center mb-2"><Icon className="w-6 h-6 text-gold-500" /></div>
                <div className="text-2xl font-bold text-navy-900">{value}</div>
                <div className="text-slate-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="section-title mb-2">Available Properties</h2>
          <p className="text-slate-500">Discover the best listings in your area</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SearchFilter onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-52 bg-slate-200 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-6 bg-slate-200 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-500 mb-2">No Properties Found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your filters or be the first to list one!</p>
            <Link to="/properties/new" className="btn-gold">List a Property</Link>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-4">{properties.length} propert{properties.length === 1 ? 'y' : 'ies'} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((p) => <PropertyCard key={p._id} property={p} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
