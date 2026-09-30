/**
 * Footer – Site footer with links, locations, and social icons.
 */
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';
import { locations } from '../data/locations';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Kitty Parties', to: '/kitty-parties' },
  { label: 'Events', to: '/events' },
];

const moreLinks = [
  { label: 'DIY Kits', to: '/diy-kits' },
  { label: 'Gourmet Platters', to: '/gourmet-platters' },
  { label: 'Grazing Tables', to: '/grazing-tables' },
  { label: 'Catering', to: '/catering' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="font-heading text-xl font-bold">Farm to Fork</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A destination for great food, creative experiences, celebrations, and beautifully
              curated gatherings.
            </p>

            {/* Social Media Icons (Inline SVGs) */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sage flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sage flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.838 9 5.048V8z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sage flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4">Our Locations</h4>
            <div className="space-y-4">
              {locations.map((loc) => (
                <div key={loc.id} className="text-sm">
                  <p className="font-semibold text-sage-light">{loc.name}</p>
                  <p className="text-white/50 flex items-start gap-1 mt-1">
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    {loc.address}
                  </p>
                  <p className="text-white/50 flex items-center gap-1">
                    <Phone size={12} />
                    {loc.phone}
                  </p>
                  <p className="text-white/50 flex items-center gap-1">
                    <Clock size={12} />
                    {loc.timings}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Farm to Fork. All rights reserved.</p>
          <p>Demo Website – No real transactions</p>
        </div>
      </div>
    </footer>
  );
}