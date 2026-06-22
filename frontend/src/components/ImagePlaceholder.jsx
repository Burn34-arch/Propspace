import { ImageOff } from 'lucide-react';

export default function ImagePlaceholder({ className = '', label = 'No Image Available' }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-navy-100 to-slate-200 ${className}`}>
      <ImageOff className="w-10 h-10 text-navy-300 mb-2" />
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}
