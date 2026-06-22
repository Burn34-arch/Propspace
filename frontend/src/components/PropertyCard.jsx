import { Link } from 'react-router-dom';
import { MapPin, Tag, Home, Building, Layers, Edit, Trash2 } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

const TYPE_ICON = { Apartment: Building, House: Home, Studio: Layers };

export default function PropertyCard({ property, onDelete, showActions = false }) {
  const TypeIcon = TYPE_ICON[property.propertyType] || Home;
  const hasImage = property.images && property.images.length > 0 && property.images[0];

  return (
    <div className="card flex flex-col overflow-hidden group">
      {/* Image */}
      <Link to={`/properties/${property._id}`} className="block relative overflow-hidden h-52">
        {hasImage ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <ImagePlaceholder
          className={`w-full h-full ${hasImage ? 'hidden' : 'flex'}`}
          label="Add property image"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${property.listingType === 'rent' ? 'bg-gold-500 text-white' : 'bg-navy-800 text-white'}`}>
            For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-white/90 text-navy-800 shadow-sm">
            <TypeIcon className="w-3 h-3" />{property.propertyType}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/properties/${property._id}`}>
          <h3 className="font-bold text-navy-900 text-lg leading-tight hover:text-gold-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1.5">
          <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
          <span className="truncate">{property.city}, {property.country}</span>
        </div>

        <p className="text-slate-500 text-sm mt-2 line-clamp-2 flex-1">{property.description}</p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-navy-900">${property.price.toLocaleString()}</span>
            {property.listingType === 'rent' && <span className="text-slate-400 text-sm">/mo</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Tag className="w-3 h-3" />
            <span>@{property.author?.username}</span>
          </div>
        </div>

        {/* Author Actions */}
        {showActions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
            <Link to={`/properties/${property._id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 btn-outline text-sm py-2 px-3">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
            <button onClick={() => onDelete(property._id)} className="flex-1 flex items-center justify-center gap-1.5 btn-danger text-sm py-2 px-3">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
