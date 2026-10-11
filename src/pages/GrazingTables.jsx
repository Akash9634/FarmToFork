import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import BookingForm from '../components/BookingForm';
import PastEventsGallery from '../components/PastEventsGallery';
import { grazingPackages, grazingTerms } from '../data/grazingPackages';
import { grazingConfig } from '../data/formConfigs';
import { useApp } from '../context/AppContext';
import { Users, Info } from 'lucide-react';

export default function GrazingTables() {
  const navigate = useNavigate();
  const { startBooking, setBookingData, setBookingStep } = useApp();

  const handleSubmit = (data) => {
    const selectedPkg = grazingPackages.find((p) => p.name === data.packageName);
    const enriched = {
      ...data,
      packagePrice: selectedPkg?.pricePerPerson || 0,
      minGuests: selectedPkg?.minGuests || 15,
    };
    startBooking('grazing', enriched);
    setBookingData(enriched);
    setBookingStep('review');
    navigate('/booking/grazing');
  };

  return (
    <div>
      <HeroSection
        title="Grazing Tables"
        subtitle="A Feast Worth Gathering Around"
        description="Beautifully styled grazing tables for weddings, corporate events, brand events, birthdays, and social gatherings."
        imageUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      {/* Packages - Styled specifically with Cormorant font */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-charcoal mb-3">Our Packages</h2>
            <p className="font-cormorant text-xl text-sage italic">Curated Grazing Experiences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {grazingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  {/* Cormorant Garamond applied here */}
                  <h3 className="font-cormorant text-3xl font-bold text-charcoal mb-1">{pkg.name}</h3>
                  <p className="font-cormorant text-lg text-terracotta italic mb-4">{pkg.tagline}</p>
                  
                  <div className="mb-6 pb-6 border-b border-cream-dark">
                    <span className="font-cormorant text-4xl font-bold text-sage">
                      ₹{pkg.pricePerPerson}
                    </span>
                    <span className="font-cormorant text-xl text-charcoal-light italic"> / person</span>
                    
                    <div className="flex items-center gap-2 text-sm text-charcoal-light mt-3">
                      <Users size={16} className="text-sage" />
                      Min. {pkg.minGuests} guests
                    </div>
                  </div>

                  {/* Nested Menu Map */}
                  <div className="space-y-5 mb-6 flex-1">
                    {pkg.menu.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-cormorant text-xl font-bold text-charcoal uppercase tracking-wide mb-2">
                          {section.category}
                        </h4>
                        <ul className="space-y-1.5">
                          {section.items.map((item, i) => (
                            <li key={i} className="text-sm text-charcoal-light font-body">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions specifically for Grazing */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-cream-dark/50 rounded-2xl p-8 border border-cream-dark">
            <h3 className="font-cormorant text-3xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <Info className="text-sage" size={28} /> Grazing Table Terms & Conditions
            </h3>
            <ul className="space-y-3 font-body text-sm text-charcoal-light">
              {grazingTerms.map((term, idx) => {
                const [boldPart, restPart] = term.split(': ');
                return (
                  <li key={idx} className="leading-relaxed">
                    <strong>{boldPart}:</strong> {restPart}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <PastEventsGallery title="Our Past Grazing Events" subtitle="Gallery" />

      {/* Booking Form */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
              Book a Grazing Table
            </h2>
            <p className="text-charcoal-light mb-6">Tell us about your event and we'll create a beautiful setup.</p>
            <BookingForm config={grazingConfig} onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
}