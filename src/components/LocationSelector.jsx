/**
 * LocationSelector – Dropdown to change location from the navbar.
 */
import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { locationNames } from '../data/locations';

export default function LocationSelector({ compact = false }) {
  const { selectedLocation, setLocation } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-full transition-all cursor-pointer ${
          compact
            ? 'px-3 py-1.5 text-sm bg-sage/10 hover:bg-sage/20 text-sage-dark'
            : 'px-4 py-2 bg-cream-dark hover:bg-sage/10 text-charcoal'
        }`}
      >
        <MapPin size={compact ? 14 : 16} />
        <span className="font-medium">{selectedLocation || 'Select Location'}</span>
        <ChevronDown size={compact ? 12 : 14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-cream-dark z-50 overflow-hidden">
          {locationNames.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocation(loc);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-sage/10 transition-colors flex items-center gap-2 cursor-pointer ${
                selectedLocation === loc ? 'bg-sage/10 text-sage-dark font-semibold' : 'text-charcoal'
              }`}
            >
              <MapPin size={14} />
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}