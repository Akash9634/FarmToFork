/**
 * Navbar – Main navigation with location selector, menu links, CTA buttons & mobile drawer.
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import LocationSelector from './LocationSelector';
import { useApp } from '../context/AppContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Kitty Parties', to: '/kitty-parties' },
  { label: 'Events', to: '/events' },
  { label: 'DIY Kits', to: '/diy-kits' },
  { label: 'Gourmet Platters', to: '/gourmet-platters' },
  { label: 'Grazing Tables', to: '/grazing-tables' },
  { label: 'Catering', to: '/catering' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top bar with CTAs */}
      <div className="hidden lg:block bg-sage text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2 text-sm">
          <span className="font-medium">Farm to Fork — Café · Experiences · Events · Catering</span>
          <div className="flex items-center gap-4">
            <Link to="/reservations" className="hover:text-cream-dark transition-colors">Reserve a Table</Link>
            <span className="text-white/40">•</span>
            <Link to="/workshops" className="hover:text-cream-dark transition-colors">Book a Workshop</Link>
            <span className="text-white/40">•</span>
            <Link to="/events" className="hover:text-cream-dark transition-colors">Plan an Event</Link>
            <span className="text-white/40">•</span>
            <Link to="/grazing-tables" className="hover:text-cream-dark transition-colors">Book a Grazing Table</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <span className="font-heading text-xl font-bold text-charcoal">Farm to Fork</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-sage bg-sage/10'
                    : 'text-charcoal-light hover:text-sage hover:bg-sage/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <LocationSelector compact />

            {/* Cart icon */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-cream-dark transition-colors cursor-pointer"
            >
              <ShoppingBag size={20} className="text-charcoal" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-terracotta text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-cream-dark transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-16 z-30">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <nav className="relative bg-white h-full max-w-xs w-full shadow-xl overflow-y-auto">
            <div className="p-4 space-y-1">
              {/* CTA buttons at top */}
              <div className="pb-4 mb-4 border-b border-cream-dark space-y-2">
                <Link
                  to="/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-sage text-white rounded-full text-sm font-semibold"
                >
                  Reserve a Table
                </Link>
                <Link
                  to="/workshops"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-terracotta text-white rounded-full text-sm font-semibold"
                >
                  Book a Workshop
                </Link>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-sage bg-sage/10'
                      : 'text-charcoal hover:text-sage hover:bg-sage/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}