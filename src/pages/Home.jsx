/**
 * Home – Landing page with hero, CTAs, services, locations, and how-it-works strip.
 */
import HeroSection from '../components/HeroSection';
import CTAButton from '../components/CTAButton';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { homeServices } from '../data/services';
import { locations } from '../data/locations';
import { MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

const howItWorks = [
  { step: '01', title: 'Choose', description: 'Pick a service that fits your occasion' },
  { step: '02', title: 'Book', description: 'Fill in the details and confirm your booking' },
  { step: '03', title: 'Pay', description: 'Secure online payment or pay at venue' },
  { step: '04', title: 'Enjoy', description: 'Show up and have an amazing experience!' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="Where Every Meal Tells a Story"
        subtitle="Café · Experiences · Events · Catering"
        description="Farm to Fork is a destination for great food, creative experiences, celebrations, and beautifully curated gatherings."
        imageUrl="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&h=900&fit=crop"
      >
        <CTAButton to="/reservations" variant="primary" size="lg">
          Reserve a Table
        </CTAButton>
        <CTAButton to="/workshops" variant="terracotta" size="lg">
          Book a Workshop
        </CTAButton>
        <CTAButton to="/events" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-charcoal">
          Plan an Event
        </CTAButton>
        <CTAButton to="/grazing-tables" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-charcoal">
          Book a Grazing Table
        </CTAButton>
      </HeroSection>

      {/* How It Works */}
      <section className="bg-sage py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="How It Works" subtitle="Simple & Easy" light />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <span className="font-heading text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="What We Offer" subtitle="Our Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {homeServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Our Locations" subtitle="Visit Us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">{loc.name}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-sage mt-0.5 shrink-0" />
                    <span className="text-charcoal-light">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-sage shrink-0" />
                    <span className="text-charcoal-light">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-sage shrink-0" />
                    <span className="text-charcoal-light">{loc.timings}</span>
                  </div>
                </div>
                <CTAButton to="/reservations" variant="outline" size="sm" className="mt-5">
                  Reserve a Table
                </CTAButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Why Farm to Fork?" subtitle="Our Promise" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              'Farm-Fresh Ingredients',
              'Handcrafted Experiences',
              'Beautifully Styled Events',
              'Warm, Welcoming Spaces',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle2 className="text-sage shrink-0" size={24} />
                <span className="font-medium text-charcoal">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}