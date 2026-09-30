/**
 * GourmetPlatters – Platter cards with size selection and add-to-order.
 */
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';
import { platters } from '../data/platters';
import { useApp } from '../context/AppContext';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function GourmetPlatters() {
  const { addToCart } = useApp();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedId, setAddedId] = useState(null);

  const handleSizeChange = (platterId, sizeIndex) => {
    setSelectedSizes((prev) => ({ ...prev, [platterId]: sizeIndex }));
  };

  const handleAddToCart = (platter) => {
    const sizeIndex = selectedSizes[platter.id] ?? 0;
    const size = platter.sizes[sizeIndex];
    addToCart({
      id: platter.id,
      name: platter.name,
      price: size.price,
      image: platter.image,
      quantity: 1,
      type: 'platter',
      size: size.label,
    });
    setAddedId(platter.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div>
      <HeroSection
        title="Gourmet Platters"
        subtitle="Curated. Fresh. Delicious."
        description="Perfect for house parties, corporate meetings, birthdays, gifting, celebrations and small events."
        imageUrl="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Our Platters" subtitle="Choose Your Platter" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {platters.map((platter) => {
              const sizeIndex = selectedSizes[platter.id] ?? 0;
              const currentSize = platter.sizes[sizeIndex];

              return (
                <div
                  key={platter.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={platter.image}
                      alt={platter.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold text-charcoal mb-2">{platter.name}</h3>
                    <p className="text-sm text-charcoal-light mb-4">{platter.description}</p>

                    {/* Size selector */}
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-medium text-charcoal uppercase">Select Size</p>
                      {platter.sizes.map((size, i) => (
                        <button
                          key={i}
                          onClick={() => handleSizeChange(platter.id, i)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all text-sm cursor-pointer ${
                            sizeIndex === i
                              ? 'border-sage bg-sage/5'
                              : 'border-cream-dark hover:border-sage/50'
                          }`}
                        >
                          <span className="text-charcoal-light">{size.label}</span>
                          <span className="font-bold text-sage">₹{size.price.toLocaleString('en-IN')}</span>
                        </button>
                      ))}
                    </div>

                    <CTAButton
                      variant={addedId === platter.id ? 'secondary' : 'primary'}
                      size="md"
                      fullWidth
                      onClick={() => handleAddToCart(platter)}
                    >
                      {addedId === platter.id ? (
                        <>
                          <CheckCircle2 size={16} className="mr-2" /> Added to Order
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} className="mr-2" /> Add to Order – ₹{currentSize.price.toLocaleString('en-IN')}
                        </>
                      )}
                    </CTAButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}