/**
 * Policies – Privacy Policy, Terms & Conditions, Cancellation & Refund,
 * Shipping & Delivery. Required by Razorpay for Live Mode KYC approval.
 * The URL path decides which section is scrolled into view.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

// Map each route to its section id
const sectionMap = {
  '/privacy-policy': 'privacy',
  '/terms-and-conditions': 'terms',
  '/cancellation-refund': 'refund',
  '/shipping-policy': 'shipping',
};

export default function Policies() {
  const { pathname } = useLocation();

  // Scroll to the section that matches the current URL
  useEffect(() => {
    const sectionId = sectionMap[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        // Small delay so the page has rendered first
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <div className="bg-cream min-h-screen pb-20">
      <HeroSection
        title="Policies & Terms"
        subtitle="Farm to Fork Café"
        height="min-h-[35vh]"
      />

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-12 text-charcoal">
        {/* PRIVACY POLICY */}
        <section
          id="privacy"
          className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm scroll-mt-24"
        >
          <h2 className="font-heading text-2xl font-bold text-sage mb-4">Privacy Policy</h2>
          <div className="text-sm text-charcoal-light space-y-3 leading-relaxed">
            <p>
              At Farm to Fork, we value your privacy. We collect personal information such as your
              name, phone number, email address, and booking preferences only when you make a
              reservation, place an order, or submit an enquiry.
            </p>
            <p>
              <strong>Data Usage:</strong> Your details are strictly used to confirm your bookings,
              communicate service updates via SMS/WhatsApp/Email, and process payments securely via
              Razorpay.
            </p>
            <p>
              <strong>Data Sharing:</strong> We do not sell, rent, or trade your personal data to
              third parties. All financial transactions are processed securely through encrypted
              gateway integrations.
            </p>
          </div>
        </section>

        {/* TERMS & CONDITIONS */}
        <section
          id="terms"
          className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm scroll-mt-24"
        >
          <h2 className="font-heading text-2xl font-bold text-sage mb-4">Terms & Conditions</h2>
          <div className="text-sm text-charcoal-light space-y-3 leading-relaxed">
            <p>
              By accessing or booking services through Farm to Fork, you agree to comply with our
              house rules and policies.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Reservations:</strong> Tables are held for a grace period of 15 minutes
                past the reserved time.
              </li>
              <li>
                <strong>Workshops & Events:</strong> Seats are confirmed only upon advance deposit
                or full payment as specified at checkout.
              </li>
              <li>
                <strong>Pricing:</strong> All prices listed on the website are in Indian Rupees (₹)
                and subject to applicable GST.
              </li>
            </ul>
          </div>
        </section>

        {/* CANCELLATION & REFUND POLICY */}
        <section
          id="refund"
          className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm scroll-mt-24"
        >
          <h2 className="font-heading text-2xl font-bold text-sage mb-4">
            Cancellation & Refund Policy
          </h2>
          <div className="text-sm text-charcoal-light space-y-3 leading-relaxed">
            <p>We understand plans change! Here are our terms for cancellations and refunds:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Table Reservations:</strong> Cancellations made 2 hours prior to the time
                slot will receive a 100% refund of the advance deposit.
              </li>
              <li>
                <strong>Workshops / Kitty Parties / Grazing Tables:</strong> Cancellations made 24
                hours prior to the event date are eligible for a 100% refund. Cancellations within
                24 hours are non-refundable but transferable to a future date.
              </li>
              <li>
                <strong>Refund Timeline:</strong> Approved refunds are credited back to the original
                payment method (Bank Account / UPI / Card) within{' '}
                <strong>5 to 7 business days</strong>.
              </li>
            </ul>
          </div>
        </section>

        {/* SHIPPING & DELIVERY POLICY */}
        <section
          id="shipping"
          className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm scroll-mt-24"
        >
          <h2 className="font-heading text-2xl font-bold text-sage mb-4">
            Shipping & Delivery Policy
          </h2>
          <div className="text-sm text-charcoal-light space-y-3 leading-relaxed">
            <p>For DIY Kits, Gourmet Platters, and Catering Orders:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Local Delivery:</strong> Fresh food platters and DIY kits are delivered
                within designated local delivery zones (Karnal, Panipat, Gharaunda) on the date &
                time slot requested by the customer.
              </li>
              <li>
                <strong>Delivery Charges:</strong> Calculated at checkout depending on location
                distance.
              </li>
              <li>
                <strong>Self-Pickup:</strong> Customers can choose store pickup at no additional
                cost during operational hours.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}