/**
 * Menu – Café menu with category tabs and item cards.
 */
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import { menuCategories, menuItems } from '../data/menu';
import { useApp } from '../context/AppContext';
import { Leaf, Drumstick, Star } from 'lucide-react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { selectedLocation } = useApp();

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <HeroSection
        title="Our Menu"
        subtitle={`Serving at ${selectedLocation || 'all locations'}`}
        description="Fresh, seasonal, and lovingly prepared. From artisan coffee to hearty mains."
        imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sage text-white shadow-md'
                    : 'bg-white text-charcoal-light hover:bg-sage/10 border border-cream-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Veg / Non-veg badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.isVeg
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.isVeg ? <Leaf size={12} /> : <Drumstick size={12} />}
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  {item.isPopular && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <Star size={12} /> Popular
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading text-lg font-bold text-charcoal">{item.name}</h3>
                    <span className="font-heading text-lg font-bold text-sage whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}