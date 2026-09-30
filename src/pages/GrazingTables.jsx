/**
 * GrazingTables – Package cards and booking form.
 */
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import BookingForm from '../components/BookingForm';
import CTAButton from '../components/CTAButton';
import { grazingPackages } from '../data/grazingPackages';
import { grazingConfig } from '../data/formConfigs';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Users } from 'lucide-react';

export default function GrazingTables() {
  const navigate = useNavigate();
  const { startBooking, setBookingData, setBookingStep } = useApp();

  const handleSubmit = (data) => {
    const selectedPkg = grazingPackages.find((p) => p.name === data.packageName);
    const enriched = {
      ...data,
      packagePrice: selectedPkg?.pricePerPerson || 0,
      minGuests: selectedPkg?.minGuests || 20,
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

      {/* Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Our Packages" subtitle="Grazing Experiences" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {grazingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-charcoal">{pkg.name}</h3>
                  <p className="text-sm text-terracotta font-medium mb-3">{pkg.tagline}</p>
                  <p className="text-sm text-charcoal-light mb-4">{pkg.description}</p>

                  <div className="flex items-center gap-2 text-sm text-charcoal-light mb-4">
                    <Users size={14} className="text-sage" />
                    Min. {pkg.minGuests} guests
                  </div>

                  <div className="mb-4">
                    <span className="font-heading text-2xl font-bold text-sage">
                      ₹{pkg.pricePerPerson}
                    </span>
                    <span className="text-charcoal-light text-sm"> / person</span>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {pkg.includes.slice(0, 5).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-charcoal-light">
                        <CheckCircle2 size={12} className="text-sage" /> {item}
                      </li>
                    ))}
                    {pkg.includes.length > 5 && (
                      <p className="text-xs text-sage font-medium">
                        +{pkg.includes.length - 5} more
                      </p>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
              Book a Grazing Table
            </h2>
            <p className="text-charcoal-light mb-6">Tell us about your event and we'll create a beautiful grazing setup.</p>
            <BookingForm config={grazingConfig} onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
}