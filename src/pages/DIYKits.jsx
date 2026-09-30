/**
 * DIYKits – Product grid with add-to-cart and category filters.
 */
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';
import { diyCategories, diyKits } from '../data/diyKits';
import { useApp } from '../context/AppContext';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function DIYKits() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useApp();
  const [addedId, setAddedId] = useState(null);

  const filteredKits =
    activeCategory === 'All'
      ? diyKits
      : diyKits.filter((kit) => kit.category === activeCategory);

  const handleAddToCart = (kit) => {
    addToCart({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
      quantity: 1,
      type: 'diy',
      size: null,
    });
    setAddedId(kit.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div>
      <HeroSection
        title="DIY Kits"
        subtitle="Take the Experience Home"
        description="Baking, craft, pottery, painting and seasonal kits — delivered to your doorstep."
        imageUrl="https://images.unsplash.com/photo-1452860606245-08f6bc0189a9?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {diyCategories.map((cat) => (
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

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKits.map((kit) => (
              <div
                key={kit.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow group"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-charcoal-light">
                    {kit.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-charcoal mb-2">{kit.name}</h3>
                  <p className="text-sm text-charcoal-light mb-3">{kit.description}</p>

                  {/* What's included */}
                  <div className="space-y-1 mb-4">
                    {kit.includes.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-charcoal-light">
                        <CheckCircle2 size={12} className="text-sage" /> {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-sage">₹{kit.price}</span>
                    <CTAButton
                      variant={addedId === kit.id ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => handleAddToCart(kit)}
                    >
                      {addedId === kit.id ? (
                        <>
                          <CheckCircle2 size={14} className="mr-1" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} className="mr-1" /> Add to Cart
                        </>
                      )}
                    </CTAButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}