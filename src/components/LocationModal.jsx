/**
 * LocationModal – Shown on first visit to select a café branch.
 */
import { useApp } from '../context/AppContext';
import { locations } from '../data/locations';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function LocationModal() {
  const { selectedLocation, locationModalShown, setLocation } = useApp();

  // Show only on first visit (no location selected yet)
  if (selectedLocation || locationModalShown) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={28} className="text-sage" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Welcome to Farm to Fork</h2>
          <p className="text-charcoal-light">Choose your nearest café location to get started</p>
        </div>

        <div className="space-y-3">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setLocation(loc.name)}
              className="w-full text-left p-4 rounded-xl border-2 border-cream-dark hover:border-sage hover:bg-sage/5 transition-all group cursor-pointer"
            >
              <div className="font-heading text-lg font-bold text-charcoal group-hover:text-sage transition-colors">
                {loc.name}
              </div>
              <div className="text-sm text-charcoal-light mt-1">{loc.address}</div>
              <div className="flex items-center gap-4 mt-2 text-xs text-charcoal-light">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {loc.timings}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {loc.phone}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}