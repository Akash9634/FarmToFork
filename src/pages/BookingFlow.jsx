/**
 * BookingFlow – Unified booking flow page for all services.
 * Handles: form → review → payment → processing → confirmation / failure
 * Route: /booking/:serviceType
 */
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Stepper from '../components/Stepper';
import BookingForm from '../components/BookingForm';
import ReviewSummary from '../components/ReviewSummary';
import PaymentPage from '../components/PaymentPage';
import ProcessingScreen from '../components/ProcessingScreen';
import ConfirmationPage from '../components/ConfirmationPage';
import SectionHeading from '../components/SectionHeading';
import {
  reservationConfig,
  workshopConfig,
  kittyConfig,
  grazingConfig,
  eventConfig,
  diyCheckoutConfig,
  platterCheckoutConfig,
} from '../data/formConfigs';
import { workshops } from '../data/workshops';
import { kittyPackages, kittyMenus } from '../data/kittyPackages';
import { grazingPackages } from '../data/grazingPackages';

// Map service types to their form configs
const configMap = {
  reservation: reservationConfig,
  workshop: workshopConfig,
  kitty: kittyConfig,
  grazing: grazingConfig,
  event: eventConfig,
  diy: diyCheckoutConfig,
  platter: platterCheckoutConfig,
};

// Map step names to stepper index
const stepMap = {
  form: 0,
  review: 1,
  payment: 2,
  processing: 2,
  confirmation: 3,
  failed: 2,
};

export default function BookingFlow() {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const {
    bookingData,
    bookingStep,
    setBookingData,
    setBookingStep,
    completeBooking,
    simulateFailure,
    cart,
    cartTotal,
    clearCart,
  } = useApp();

  // Get the right config for this service
  let config = configMap[serviceType] || reservationConfig;

  // Enrich workshop config with options
  if (serviceType === 'workshop') {
    config = {
      ...config,
      fields: config.fields.map((field) => {
        if (field.name === 'workshopName') {
          return { ...field, options: workshops.map((w) => w.name) };
        }
        return field;
      }),
    };
  }

  // Enrich kitty config with menu options
  if (serviceType === 'kitty') {
    config = {
      ...config,
      fields: config.fields.map((field) => {
        if (field.name === 'menuPreference') {
          return { ...field, options: kittyMenus.map((m) => m.name) };
        }
        return field;
      }),
    };
  }

  const isEnquiry = config.isEnquiry && serviceType !== 'event';
  const steps = isEnquiry
    ? ['Details', 'Confirmation']
    : ['Details', 'Review', 'Payment', 'Confirmation'];

  // Calculate price items based on service type
  const getPriceItems = () => {
    if (!bookingData) return [];

    switch (serviceType) {
      case 'reservation': {
        return [{ label: 'Table Reservation Deposit', amount: 500 }];
      }
      case 'workshop': {
        const ws = workshops.find((w) => w.name === bookingData.workshopName);
        const price = ws?.price || bookingData.workshopPrice || 1499;
        const guests = parseInt(bookingData.guests) || 1;
        return [{ label: `${bookingData.workshopName} × ${guests} guests`, amount: price * guests }];
      }
      case 'kitty': {
        const pkg = kittyPackages.find((p) => p.name === bookingData.packageType);
        const price = pkg?.pricePerPerson || bookingData.packagePrice || 799;
        const guests = parseInt(bookingData.guests) || 5;
        return [
          { label: `${bookingData.packageType} Package × ${guests} guests`, amount: price * guests },
        ];
      }
      case 'grazing': {
        const gp = grazingPackages.find((p) => p.name === bookingData.packageName);
        const price = gp?.pricePerPerson || bookingData.packagePrice || 899;
        const guests = parseInt(bookingData.guests) || 20;
        return [
          { label: `${bookingData.packageName} × ${guests} guests`, amount: price * guests },
        ];
      }
      case 'event': {
        return [{ label: 'Event Advance Deposit', amount: 10000 }];
      }
      case 'diy':
      case 'platter': {
        return cart.map((item) => ({
          label: `${item.name}${item.size ? ` (${item.size})` : ''} × ${item.quantity}`,
          amount: item.price * item.quantity,
        }));
      }
      default:
        return [{ label: 'Booking', amount: 1000 }];
    }
  };

  const priceItems = getPriceItems();
  const taxRate = ['reservation'].includes(serviceType) ? 0 : 0.18;

  const deposit =
    serviceType === 'reservation'
      ? { label: 'Advance Deposit', amount: 500, note: 'Adjustable against your final bill' }
      : serviceType === 'event'
      ? { label: 'Event Advance', amount: 10000, note: 'Non-refundable advance to confirm date' }
      : null;

  // Handlers
  const handleFormSubmit = (data) => {
    setBookingData(data);
    if (isEnquiry) {
      completeBooking();
    } else {
      setBookingStep('review');
    }
  };

  const handleProceedToPayment = () => {
    setBookingStep('payment');
  };

  const handlePay = () => {
    setBookingStep('processing');
  };

  const handleProcessingComplete = () => {
    if (simulateFailure) {
      setBookingStep('failed');
    } else {
      if (serviceType === 'diy' || serviceType === 'platter') {
        clearCart();
      }
      completeBooking();
    }
  };

  const handleRetry = () => {
    setBookingStep('payment');
  };

  // Render the current step
  const renderStep = () => {
    switch (bookingStep) {
      case 'form':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">{config.title}</h2>
              {config.subtitle && (
                <p className="text-charcoal-light mb-6">{config.subtitle}</p>
              )}

              {/* Cart summary for DIY/Platter */}
              {(serviceType === 'diy' || serviceType === 'platter') && cart.length > 0 && (
                <div className="bg-cream rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-medium text-charcoal mb-2">Order Items</h4>
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm py-1">
                      <span className="text-charcoal-light">
                        {item.name} {item.size ? `(${item.size})` : ''} × {item.quantity}
                      </span>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="border-t border-sage/20 mt-2 pt-2 flex justify-between font-bold">
                    <span>Subtotal</span>
                    <span className="text-sage">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <BookingForm
                config={config}
                initialValues={bookingData || {}}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        );

      case 'review':
        return (
          <ReviewSummary
            bookingData={bookingData}
            config={config}
            priceItems={priceItems}
            taxRate={taxRate}
            deposit={deposit}
            onConfirm={handleProceedToPayment}
            onBack={() => setBookingStep('form')}
          />
        );

      case 'payment':
        return (
          <PaymentPage
            priceItems={priceItems}
            taxRate={taxRate}
            deposit={deposit}
            onPay={handlePay}
            onBack={() => setBookingStep('review')}
          />
        );

      case 'processing':
        return <ProcessingScreen onComplete={handleProcessingComplete} />;

      case 'confirmation':
        return (
          <ConfirmationPage
            success
            bookingData={bookingData}
            config={config}
          />
        );

      case 'failed':
        return <ConfirmationPage success={false} onRetry={handleRetry} />;

      default:
        return null;
    }
  };

  // If no booking data and we're past form step, redirect back
  if (!bookingData && bookingStep !== 'form') {
    return (
      <div className="py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">No Booking Data</h2>
          <p className="text-charcoal-light mb-6">
            It seems you haven't started a booking yet. Please go back and fill in the form.
          </p>
          <button
            onClick={() => {
              setBookingStep('form');
            }}
            className="px-6 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage-dark transition-colors cursor-pointer"
          >
            Start Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Service title */}
        <div className="text-center mb-6">
          <p className="text-sm text-terracotta font-medium uppercase tracking-wider">
            {config.title}
          </p>
          {bookingData?.location && (
            <p className="text-sm text-charcoal-light mt-1">
              📍 Booking for: <span className="font-medium text-sage">{bookingData.location}</span>
            </p>
          )}
        </div>

        {/* Stepper */}
        <Stepper steps={steps} currentStep={stepMap[bookingStep] ?? 0} />

        {/* Step content */}
        {renderStep()}
      </div>
    </div>
  );
}