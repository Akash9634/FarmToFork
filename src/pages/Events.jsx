/**
 * Events – Event types, services offered, and enquiry form.
 */
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import BookingForm from '../components/BookingForm';
import { eventTypes, eventServices } from '../data/events';
import { eventConfig } from '../data/formConfigs';
import { useApp } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Events() {
  const navigate = useNavigate();
  const { startBooking, setBookingData, setBookingStep } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data) => {
    // Events are enquiry-based. Show thank you, but also allow optional payment.
    startBooking('event', data);
    setBookingData(data);
    setBookingStep('review');
    setSubmitted(true);
  };

  return (
    <div>
      <HeroSection
        title="Events & Private Bookings"
        subtitle="Your Event. Your Way."
        description="From birthdays to brand launches — we create customised event experiences with food, décor, and hospitality."
        imageUrl="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      {/* Event types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Events We Host" subtitle="Celebrations" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {eventTypes.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark text-center hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-2">{event.icon}</span>
                <h4 className="font-heading font-bold text-charcoal text-sm">{event.name}</h4>
                <p className="text-xs text-charcoal-light mt-1">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="What We Offer" subtitle="Event Services" />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {eventServices.map((service, i) => (
              <div key={i} className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm text-sm">
                <CheckCircle2 size={14} className="text-sage" />
                <span className="text-charcoal">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8 text-center">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-sage" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Thank You!</h2>
              <p className="text-charcoal-light mb-4">
                Your event enquiry has been submitted. Our team will contact you within 24 hours.
              </p>
              <p className="text-sm text-sage mb-6">
                Want to lock in your date? You can pay an advance to confirm your booking.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/booking/event')}
                  className="px-6 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage-dark transition-colors cursor-pointer"
                >
                  Pay Advance to Confirm
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border-2 border-sage text-sage rounded-full font-semibold hover:bg-sage hover:text-white transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
                Plan Your Event
              </h2>
              <p className="text-charcoal-light mb-6">
                Tell us about your event and we'll create a customised experience for you.
              </p>
              <BookingForm config={eventConfig} onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}