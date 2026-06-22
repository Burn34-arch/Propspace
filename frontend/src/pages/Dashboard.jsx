import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, LayoutDashboard, Building2, TrendingUp, Eye } from 'lucide-react';
import { fetchMyListings, deleteProperty } from '../api/property.api';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    setLoading(true);
    try {
      const res = await fetchMyListings();
      setListings(res.data);
    } catch {
      toast.error('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
    return () => {};
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property? This cannot be undone.')) return;
    try {
      await deleteProperty(id);
      setListings((prev) => prev.filter((p) => p._id !== id));
      toast.success('Property deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete property');
    }
  };

  const forSale = listings.filter((p) => p.listingType === 'sale').length;
  const forRent = listings.filter((p) => p.listingType === 'rent').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="w-5 h-5 text-gold-500" />
            <h1 className="text-3xl font-bold text-navy-900">My Dashboard</h1>
          </div>
          <p className="text-slate-500">
            Welcome back, <span className="font-semibold text-navy-700">{user?.username}</span>
          </p>
        </div>
        <Link to="/properties/new" className="btn-gold flex items-center gap-2 self-start sm:self-auto">
          <PlusCircle className="w-4 h-4" /> New Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Building2, label: 'Total Listings', value: listings.length, color: 'bg-navy-50 text-navy-700', iconColor: 'text-navy-600' },
          { icon: TrendingUp, label: 'For Sale', value: forSale, color: 'bg-gold-50 text-gold-700', iconColor: 'text-gold-600' },
          { icon: Eye, label: 'For Rent', value: forRent, color: 'bg-emerald-50 text-emerald-700', iconColor: 'text-emerald-600' },
        ].map(({ icon: Icon, label, value, color, iconColor }) => (
          <div key={label} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{value}</p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-title">My Properties</h2>
        {listings.length > 0 && (
          <span className="text-sm text-slate-400">{listings.length} listing{listings.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-52 bg-slate-200 rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-8 bg-slate-200 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-24 card">
          <Building2 className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-500 mb-2">No Listings Yet</h3>
          <p className="text-slate-400 mb-6">Create your first property listing to get started.</p>
          <Link to="/properties/new" className="btn-gold inline-flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Create Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((p) => (
            <PropertyCard key={p._id} property={p} onDelete={handleDelete} showActions />
          ))}
        </div>
      )}
    </div>
  );
}
