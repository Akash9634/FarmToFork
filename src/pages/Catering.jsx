/**
 * Catering – Enquiry page with a quote request form (no payment).
 */
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import BookingForm from '../components/BookingForm';
import { cateringConfig } from '../data/formConfigs';
import { CheckCircle2 } from 'lucide-react';

const cateringTypes = [
  'Corporate Events',
  'Weddings',
  'Private Parties',
  'Birthday Celebrations',
  'Family Functions',
  'Brand Events',
  'Large Gatherings',
];

export default function Catering() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <HeroSection
        title="Catering Services"
        subtitle="Farm to Fork, Wherever You Celebrate"
        description="Customised catering options with food, beverages, and hospitality for events of all sizes."
        imageUrl="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      {/* Catering types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="We Cater For" subtitle="Our Services" />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {cateringTypes.map((type, i) => (
              <div key={i} className="flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-sm border border-cream-dark">
                <CheckCircle2 size={16} className="text-sage" />
                <span className="text-sm font-medium text-charcoal">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-2xl mx-auto px-4">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8 text-center">
              <CheckCircle2 size={60} className="mx-auto text-sage mb-4" />
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Thank You!</h2>
              <p className="text-charcoal-light mb-4">
                Your catering enquiry has been submitted successfully.
              </p>
              <p className="text-sm text-sage mb-6">
                Our team will contact you within 24 hours with a customised quote.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage-dark transition-colors cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Request a Quote</h2>
              <p className="text-charcoal-light mb-6">
                Tell us about your catering needs and we'll get back to you with a customised proposal.
              </p>
              <BookingForm config={cateringConfig} onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}