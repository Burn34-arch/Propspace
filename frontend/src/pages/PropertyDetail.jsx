import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Tag, Home, Building, Layers, Edit, Trash2, ArrowLeft, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPropertyById, deleteProperty } from '../api/property.api';
import { useAuth } from '../context/AuthContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import toast from 'react-hot-toast';

const TYPE_ICON = { Apartment: Building, House: Home, Studio: Layers };

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPropertyById(id)
      .then((res) => { if (active) setProperty(res.data); })
      .catch(() => toast.error('Property not found'))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-navy-800 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="text-center py-24">
      <p className="text-slate-500 text-xl">Property not found.</p>
      <Link to="/" className="btn-primary mt-4 inline-block">Back to listings</Link>
    </div>
  );

  const TypeIcon = TYPE_ICON[property.propertyType] || Home;
  const isOwner = user && property.author._id === user._id;
  const images = property.images?.filter(Boolean) || [];

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) return;
    setDeleting(true);
    try {
      await deleteProperty(id);
      toast.success('Property deleted successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete property');
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-navy-800 transition-colors mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Images + Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="relative rounded-2xl overflow-hidden shadow-md bg-slate-100 h-80 sm:h-96">
            {images.length > 0 ? (
              <>
                <img
                  src={images[imgIndex]}
                  alt={`${property.title} - image ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                {images.length > 1 && (
                  <>
                    <button onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setImgIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`} />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <ImagePlaceholder className="w-full h-full" label="No images provided for this property" />
            )}
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`badge ${property.listingType === 'rent' ? 'bg-gold-500 text-white' : 'bg-navy-800 text-white'}`}>
                For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
              </span>
              <span className="badge bg-white/90 text-navy-800 shadow">
                <TypeIcon className="w-3 h-3" />{property.propertyType}
              </span>
            </div>
          </div>

          {/* Title & Location */}
          <div className="card p-6">
            <h1 className="text-3xl font-bold text-navy-900 mb-2">{property.title}</h1>
            <div className="flex items-center gap-1.5 text-slate-500 mb-4">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>{property.city}, {property.country}</span>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <h2 className="font-semibold text-navy-800 mb-2">About this property</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </div>
        </div>

        {/* Right — Price Card + Author */}
        <div className="space-y-4">
          {/* Price */}
          <div className="card p-6 border-l-4 border-gold-500">
            <div className="text-3xl font-extrabold text-navy-900">
              ${property.price.toLocaleString()}
              {property.listingType === 'rent' && <span className="text-base font-normal text-slate-400">/month</span>}
            </div>
            <p className="text-slate-500 text-sm mt-1">{property.listingType === 'rent' ? 'Monthly Rent' : 'Sale Price'}</p>
          </div>

          {/* Details Grid */}
          <div className="card p-6 space-y-3">
            <h3 className="font-semibold text-navy-800">Property Details</h3>
            {[
              { icon: TypeIcon, label: 'Type', value: property.propertyType },
              { icon: Tag, label: 'Listing', value: property.listingType === 'rent' ? 'For Rent' : 'For Sale' },
              { icon: MapPin, label: 'Location', value: `${property.city}, ${property.country}` },
              { icon: Calendar, label: 'Listed', value: new Date(property.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-navy-600" />
                </div>
                <div>
                  <span className="text-slate-400">{label}</span>
                  <p className="font-medium text-navy-800">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Author */}
          <div className="card p-6">
            <h3 className="font-semibold text-navy-800 mb-3">Listed by</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white font-bold">
                {property.author?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-navy-900">{property.author?.name || property.author?.username}</p>
                <p className="text-slate-400 text-xs">@{property.author?.username}</p>
              </div>
            </div>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="card p-4 space-y-2">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">Your listing</p>
              <Link to={`/properties/${id}/edit`} className="btn-outline w-full flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Edit Property
              </Link>
              <button onClick={handleDelete} disabled={deleting} className="btn-danger w-full flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> {deleting ? 'Deleting...' : 'Delete Property'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
