/**
 * ServiceCard – Displays a service with icon, title, description and CTA link.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Palette, PartyPopper, CalendarHeart, Package, ChefHat, Flower2, Truck } from 'lucide-react';

// Map icon names to components
const iconMap = {
  UtensilsCrossed,
  Palette,
  PartyPopper,
  CalendarHeart,
  Package,
  ChefHat,
  Flower2,
  Truck,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Package;

  return (
    <Link
      to={service.link}
      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-cream-dark hover:border-sage/30 flex flex-col"
    >
      <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center mb-4 group-hover:bg-sage group-hover:text-white transition-all duration-300">
        <IconComponent size={24} className="text-sage group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-heading text-xl font-bold text-charcoal mb-1">{service.title}</h3>
      <p className="text-sm text-terracotta font-medium mb-2">{service.subtitle}</p>
      <p className="text-charcoal-light text-sm flex-1 mb-4">{service.description}</p>
      <div className="flex items-center gap-2 text-sage font-semibold text-sm group-hover:gap-3 transition-all">
        {service.cta}
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}