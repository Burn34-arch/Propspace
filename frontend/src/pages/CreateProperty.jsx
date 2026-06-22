import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X, ImagePlus } from 'lucide-react';
import { createProperty } from '../api/property.api';
import ImagePlaceholder from '../components/ImagePlaceholder';
import toast from 'react-hot-toast';

const INITIAL = {
  title: '', description: '', price: '', city: '', country: '',
  propertyType: 'Apartment', listingType: 'sale', images: [''],
};

export default function CreateProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageChange = (index, value) => {
    const imgs = [...form.images];
    imgs[index] = value;
    setForm((p) => ({ ...p, images: imgs }));
  };

  const addImageField = () => {
    if (form.images.length < 5) setForm((p) => ({ ...p, images: [...p.images, ''] }));
  };

  const removeImageField = (index) => {
    const imgs = form.images.filter((_, i) => i !== index);
    setForm((p) => ({ ...p, images: imgs.length ? imgs : [''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), images: form.images.filter(Boolean) };
      const res = await createProperty(payload);
      toast.success('Property listed successfully!');
      navigate(`/properties/${res.data._id}`);
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.msg
        || 'Failed to create listing';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const previewImg = form.images.find(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 flex items-center gap-2">
          <PlusCircle className="w-7 h-7 text-gold-500" /> List a Property
        </h1>
        <p className="text-slate-500 mt-1">Fill in the details to publish your listing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview */}
        <div className="card overflow-hidden">
          <div className="h-52 relative">
            {previewImg ? (
              <img src={previewImg} alt="Preview" className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            ) : null}
            <ImagePlaceholder
              className={`w-full h-full ${previewImg ? 'hidden' : 'flex'}`}
              label="Image preview will appear here"
            />
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <ImagePlus className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-medium text-slate-700">Image URLs (up to 5)</span>
            </div>
            <div className="space-y-2">
              {form.images.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    placeholder={`Image URL ${i + 1} (paste a link)`}
                    className="input-field text-sm"
                  />
                  {form.images.length > 1 && (
                    <button type="button" onClick={() => removeImageField(i)}
                      className="p-2.5 text-red-400 hover:text-red-600 border border-slate-300 rounded-lg hover:bg-red-50 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {form.images.length < 5 && (
              <button type="button" onClick={addImageField}
                className="mt-2 text-sm text-gold-600 hover:text-gold-700 font-medium flex items-center gap-1">
                <PlusCircle className="w-3.5 h-3.5" /> Add another image
              </button>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-navy-800 text-lg">Property Information</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              placeholder="e.g. Modern 2-Bed Apartment in Downtown" className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
              placeholder="Describe the property — amenities, condition, nearby places..."
              className="input-field resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Type *</label>
              <select name="propertyType" value={form.propertyType} onChange={handleChange} className="input-field">
                {['Apartment', 'House', 'Studio'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Listing Type *</label>
              <select name="listingType" value={form.listingType} onChange={handleChange} className="input-field">
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Price */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-navy-800 text-lg">Location & Pricing</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">City *</label>
              <input name="city" value={form.city} onChange={handleChange} required
                placeholder="e.g. New York" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Country *</label>
              <input name="country" value={form.country} onChange={handleChange} required
                placeholder="e.g. United States" className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Price * {form.listingType === 'rent' ? '(per month)' : '(sale price)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input name="price" type="number" value={form.price} onChange={handleChange} required min="0"
                placeholder="0" className="input-field pl-7" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)}
            className="btn-outline flex-1">Cancel</button>
          <button type="submit" disabled={loading} className="btn-gold flex-1 flex items-center justify-center gap-2">
            <PlusCircle className="w-4 h-4" />
            {loading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
