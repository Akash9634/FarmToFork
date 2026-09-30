/**
 * KittyParties – Kitty party menus, packages, table setups, décor and booking.
 */
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import BookingForm from '../components/BookingForm';
import CTAButton from '../components/CTAButton';
import { kittyMenus, kittyPackages, kittyAddOns, kittyTableSetups, kittyDecorOptions } from '../data/kittyPackages';
import { kittyConfig } from '../data/formConfigs';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Star } from 'lucide-react';

export default function KittyParties() {
  const navigate = useNavigate();
  const { startBooking, setBookingData, setBookingStep } = useApp();

  const formConfig = {
    ...kittyConfig,
    fields: kittyConfig.fields.map((field) => {
      if (field.name === 'menuPreference') {
        return { ...field, options: kittyMenus.map((m) => m.name) };
      }
      return field;
    }),
  };

  const handleSubmit = (data) => {
    // Find the package price
    const selectedPkg = kittyPackages.find((p) => p.name === data.packageType);
    const enriched = {
      ...data,
      packagePrice: selectedPkg?.pricePerPerson || 0,
    };
    startBooking('kitty', enriched);
    setBookingData(enriched);
    setBookingStep('review');
    navigate('/booking/kitty');
  };

  return (
    <div>
      <HeroSection
        title="Kitty Parties"
        subtitle="Your Kitty, Our Table"
        description="Special kitty party menus, packages, table setups, décor options and add-ons for the perfect celebration."
        imageUrl="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      {/* Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Party Packages" subtitle="Choose Your Package" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {kittyPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-shadow hover:shadow-md ${
                  index === 1 ? 'border-sage ring-2 ring-sage/20' : 'border-cream-dark'
                }`}
              >
                {index === 1 && (
                  <div className="flex items-center gap-1 text-sage text-xs font-bold uppercase mb-2">
                    <Star size={14} /> Most Popular
                  </div>
                )}
                <h3 className="font-heading text-2xl font-bold text-charcoal">{pkg.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="font-heading text-3xl font-bold text-sage">
                    ₹{pkg.pricePerPerson}
                  </span>
                  <span className="text-charcoal-light text-sm"> / person</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal-light">
                      <CheckCircle2 size={14} className="text-sage shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menus */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Menu Options" subtitle="Curated Menus" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {kittyMenus.map((menu) => (
              <div key={menu.id} className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="font-heading text-lg font-bold text-charcoal">{menu.name}</h4>
                <p className="text-sm text-charcoal-light mt-1 mb-3">{menu.description}</p>
                <p className="text-sage font-bold">₹{menu.pricePerPerson}/person</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Setups & Décor */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionHeading title="Table Setups" subtitle="Seating Options" centered={false} />
              <ul className="space-y-2 mt-4">
                {kittyTableSetups.map((setup, i) => (
                  <li key={i} className="flex items-center gap-2 text-charcoal-light">
                    <CheckCircle2 size={16} className="text-sage" /> {setup}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title="Décor Options" subtitle="Style Your Party" centered={false} />
              <ul className="space-y-2 mt-4">
                {kittyDecorOptions.map((decor, i) => (
                  <li key={i} className="flex items-center gap-2 text-charcoal-light">
                    <CheckCircle2 size={16} className="text-terracotta" /> {decor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Add-ons" subtitle="Extras" />
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {kittyAddOns.map((addon) => (
              <div key={addon.id} className="bg-white rounded-full px-5 py-2.5 shadow-sm text-sm">
                <span className="font-medium text-charcoal">{addon.name}</span>
                <span className="text-sage font-bold ml-2">₹{addon.price.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
              Book Your Kitty Party
            </h2>
            <p className="text-charcoal-light mb-6">Fill in your details and we'll set up the perfect party for you.</p>
            <BookingForm config={formConfig} onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
}