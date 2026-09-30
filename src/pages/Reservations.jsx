/**
 * Reservations – Table reservation page with booking form.
 */
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import BookingForm from '../components/BookingForm';
import { reservationConfig } from '../data/formConfigs';
import { useApp } from '../context/AppContext';

export default function Reservations() {
  const navigate = useNavigate();
  const { startBooking, setBookingData, setBookingStep } = useApp();

  const handleSubmit = (data) => {
    startBooking('reservation', data);
    setBookingData(data);
    setBookingStep('review');
    navigate('/booking/reservation');
  };

  return (
    <div>
      <HeroSection
        title="Reserve a Table"
        subtitle="Your Table Awaits"
        description="Reserve your table for lunch, dinner, celebrations, or a casual gathering with friends and family."
        imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
              {reservationConfig.title}
            </h2>
            <BookingForm config={reservationConfig} onSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
}