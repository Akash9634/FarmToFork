/**
 * Contact – General enquiry form plus locations section.
 */
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import BookingForm from '../components/BookingForm';
import { contactConfig } from '../data/formConfigs';
import { locations } from '../data/locations';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <HeroSection
        title="Contact Us"
        subtitle="Let's Plan Something Delicious"
        description="For bookings, enquiries, or just to say hello — we'd love to hear from you."
        imageUrl="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8 text-center">
                  <CheckCircle2 size={60} className="mx-auto text-sage mb-4" />
                  <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
                    Thank You!
                  </h2>
                  <p className="text-charcoal-light mb-4">
                    Your enquiry has been submitted. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage-dark transition-colors cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
                  <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
                    Send Us an Enquiry
                  </h2>
                  <p className="text-charcoal-light mb-6">
                    Fill in the form below and our team will get back to you.
                  </p>
                  <BookingForm config={contactConfig} onSubmit={handleSubmit} />
                </div>
              )}
            </div>

            {/* Locations */}
            <div>
              <SectionHeading title="Our Locations" subtitle="Visit Us" centered={false} />
              <div className="space-y-6 mt-6">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark"
                  >
                    <h4 className="font-heading text-lg font-bold text-charcoal mb-3">
                      {loc.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-sage mt-0.5" />
                        <span className="text-charcoal-light">{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-sage" />
                        <span className="text-charcoal-light">{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-sage" />
                        <span className="text-charcoal-light">{loc.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-sage" />
                        <span className="text-charcoal-light">{loc.timings}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}