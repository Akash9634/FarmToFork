/**
 * Workshops – Workshop cards with booking functionality.
 */
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';
import BookingForm from '../components/BookingForm';
import Modal from '../components/Modal';
import { workshops } from '../data/workshops';
import { workshopConfig } from '../data/formConfigs';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { Clock, Users, CheckCircle2 } from 'lucide-react';

export default function Workshops() {
  const navigate = useNavigate();
  const { startBooking, setBookingData, setBookingStep } = useApp();
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleBookNow = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowForm(true);
  };

  const handleSubmit = (data) => {
    const enriched = {
      ...data,
      workshopName: selectedWorkshop?.name || data.workshopName,
      workshopPrice: selectedWorkshop?.price || 0,
    };
    startBooking('workshop', enriched);
    setBookingData(enriched);
    setBookingStep('review');
    setShowForm(false);
    navigate('/booking/workshop');
  };

  // Build config with workshop names as options
  const formConfig = {
    ...workshopConfig,
    fields: workshopConfig.fields.map((field) => {
      if (field.name === 'workshopName') {
        return { ...field, options: workshops.map((w) => w.name) };
      }
      return field;
    }),
  };

  return (
    <div>
      <HeroSection
        title="Creative Workshops"
        subtitle="Create. Connect. Celebrate."
        description="Pottery, painting, coffee experiences, baking and more — hands-on creative workshops for all."
        imageUrl="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&h=600&fit=crop"
        height="min-h-[50vh]"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Our Workshops" subtitle="Experiences" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow group"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={workshop.image}
                    alt={workshop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 bg-sage text-white px-3 py-1.5 rounded-full text-sm font-bold">
                    ₹{workshop.price}/person
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-charcoal mb-1">
                    {workshop.name}
                  </h3>
                  <p className="text-sm text-terracotta font-medium mb-3">{workshop.tagline}</p>
                  <p className="text-sm text-charcoal-light mb-4">{workshop.description}</p>

                  <div className="flex items-center gap-4 text-xs text-charcoal-light mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {workshop.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {workshop.groupSize}
                    </span>
                  </div>

                  {/* Includes */}
                  <div className="space-y-1.5 mb-5">
                    {workshop.includes.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal-light">
                        <CheckCircle2 size={12} className="text-sage" />
                        {item}
                      </div>
                    ))}
                    {workshop.includes.length > 3 && (
                      <p className="text-xs text-sage font-medium">
                        +{workshop.includes.length - 3} more included
                      </p>
                    )}
                  </div>

                  <CTAButton
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => handleBookNow(workshop)}
                  >
                    Book Now
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={`Book: ${selectedWorkshop?.name || 'Workshop'}`}
        maxWidth="max-w-2xl"
      >
        <BookingForm
          config={formConfig}
          initialValues={{ workshopName: selectedWorkshop?.name || '' }}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}