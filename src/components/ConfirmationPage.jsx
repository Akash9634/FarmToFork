/**
 * ConfirmationPage – Success / Failure screen after payment.
 */
import { CheckCircle2, XCircle, Calendar, Download, Home, MessageCircle } from 'lucide-react';
import CTAButton from './CTAButton';
import { useApp } from '../context/AppContext';

export default function ConfirmationPage({ success = true, bookingData, config, onRetry }) {
  const { bookingId, resetBooking } = useApp();

  if (!success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <XCircle size={80} className="mx-auto text-red-500 mb-6" />
          <h2 className="font-heading text-3xl font-bold text-charcoal mb-3">Payment Failed</h2>
          <p className="text-charcoal-light mb-8">
            The payment could not be processed. Please try again or choose a different payment method.
          </p>
          <div className="space-y-3">
            <CTAButton variant="terracotta" size="lg" fullWidth onClick={onRetry}>
              Retry Payment
            </CTAButton>
            <CTAButton variant="outline" size="md" fullWidth to="/" onClick={resetBooking}>
              Back to Home
            </CTAButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto">
        <CheckCircle2 size={80} className="mx-auto text-sage mb-6" />
        <h2 className="font-heading text-3xl font-bold text-charcoal mb-3">Booking Confirmed!</h2>
        <p className="text-charcoal-light mb-2">Thank you for your booking with Farm to Fork.</p>

        {/* Booking ID */}
        <div className="bg-sage/10 rounded-xl p-4 my-6">
          <p className="text-sm text-sage-dark mb-1">Booking ID</p>
          <p className="font-heading text-2xl font-bold text-sage">{bookingId || 'FTF-2026-0001'}</p>
        </div>

        {/* Summary */}
        {bookingData && (
          <div className="bg-white rounded-xl border border-cream-dark p-5 mb-6 text-left">
            <h4 className="font-heading font-bold text-charcoal mb-3">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              {bookingData.location && (
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Location</span>
                  <span className="font-medium">{bookingData.location}</span>
                </div>
              )}
              {bookingData.date && (
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Date</span>
                  <span className="font-medium">{bookingData.date}</span>
                </div>
              )}
              {bookingData.time && (
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Time</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
              )}
              {bookingData.guests && (
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Guests</span>
                  <span className="font-medium">{bookingData.guests}</span>
                </div>
              )}
              {bookingData.name && (
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Name</span>
                  <span className="font-medium">{bookingData.name}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification */}
        <div className="flex items-center justify-center gap-2 text-sm text-sage bg-sage/10 rounded-lg p-3 mb-6">
          <MessageCircle size={16} />
          Confirmation sent via WhatsApp & Email
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton variant="outline" size="md" onClick={() => alert('Calendar event added (demo)')}>
            <Calendar size={16} className="mr-2" />
            Add to Calendar
          </CTAButton>
          <CTAButton variant="outline" size="md" onClick={() => alert('Receipt downloaded (demo)')}>
            <Download size={16} className="mr-2" />
            Download Receipt
          </CTAButton>
        </div>

        <div className="mt-6">
          <CTAButton variant="primary" size="lg" to="/" onClick={resetBooking}>
            <Home size={16} className="mr-2" />
            Back to Home
          </CTAButton>
        </div>
      </div>
    </div>
  );
}