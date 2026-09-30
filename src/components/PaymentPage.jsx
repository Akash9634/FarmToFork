/**
 * PaymentPage – Simulated payment screen with multiple payment methods.
 */
import { useState } from 'react';
import { CreditCard, Smartphone, Building2, MapPin, AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-react';
import CTAButton from './CTAButton';
import PriceSummary from './PriceSummary';
import { useApp } from '../context/AppContext';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, description: 'All major banks' },
  { id: 'venue', label: 'Pay at Venue', icon: MapPin, description: 'Pay when you arrive' },
];

const mockBanks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Kotak Mahindra Bank'];

export default function PaymentPage({ priceItems, taxRate = 0.18, deposit, onPay, onBack }) {
  const { simulateFailure, setSimulateFailure } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  // Calculate total to pay
  const subtotal = priceItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;
  const payAmount = deposit ? deposit.amount : total;

  const handlePay = () => {
    onPay(selectedMethod);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Demo banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6 flex items-center gap-3">
        <AlertTriangle className="text-amber-500 shrink-0" size={24} />
        <div>
          <p className="font-semibold text-amber-800">Demo Mode – No real payment will be processed</p>
          <p className="text-sm text-amber-600">Click "Pay" to simulate a successful payment experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Payment methods – left */}
        <div className="lg:col-span-3 space-y-5">
          <h3 className="font-heading text-xl font-bold text-charcoal">Choose Payment Method</h3>

          {/* Method selector */}
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
                    selectedMethod === method.id
                      ? 'border-sage bg-sage/5'
                      : 'border-cream-dark hover:border-sage/50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedMethod === method.id ? 'bg-sage text-white' : 'bg-cream-dark text-charcoal-light'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{method.label}</p>
                    <p className="text-sm text-charcoal-light">{method.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Payment form based on method */}
          <div className="bg-white rounded-xl border border-cream-dark p-5">
            {selectedMethod === 'upi' && (
              <div className="space-y-4">
                <h4 className="font-medium text-charcoal">UPI Payment</h4>
                {/* Fake QR */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-cream-dark rounded-xl flex items-center justify-center border-2 border-dashed border-sage/30">
                    <div className="text-center">
                      <Smartphone size={40} className="mx-auto text-sage mb-2" />
                      <p className="text-xs text-charcoal-light">Scan QR Code</p>
                      <p className="text-xs text-charcoal-light">(Demo)</p>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-charcoal-light">or enter UPI ID</div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@paytm"
                  className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark focus:border-sage outline-none"
                />
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <h4 className="font-medium text-charcoal">Card Details</h4>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name on Card"
                  className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark focus:border-sage outline-none"
                />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  maxLength={19}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark focus:border-sage outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark focus:border-sage outline-none"
                  />
                  <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark focus:border-sage outline-none"
                  />
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div className="space-y-4">
                <h4 className="font-medium text-charcoal">Select Your Bank</h4>
                <div className="grid grid-cols-2 gap-2">
                  {mockBanks.map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl border-2 text-sm text-left transition-all cursor-pointer ${
                        selectedBank === bank
                          ? 'border-sage bg-sage/5 font-medium'
                          : 'border-cream-dark hover:border-sage/50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedMethod === 'venue' && (
              <div className="text-center py-6">
                <MapPin size={40} className="mx-auto text-sage mb-3" />
                <h4 className="font-medium text-charcoal mb-2">Pay at Venue</h4>
                <p className="text-sm text-charcoal-light">
                  Your booking will be confirmed. Pay the full amount when you arrive at the café.
                </p>
              </div>
            )}
          </div>

          {/* Simulate Failure Toggle */}
          <div className="flex items-center gap-3 bg-red-50 rounded-xl p-4 border border-red-200">
            <button
              onClick={() => setSimulateFailure(!simulateFailure)}
              className="cursor-pointer text-red-500"
            >
              {simulateFailure ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
            </button>
            <div>
              <p className="text-sm font-medium text-red-700">Simulate Failed Payment</p>
              <p className="text-xs text-red-500">Toggle on to test the failure screen</p>
            </div>
          </div>
        </div>

        {/* Order summary – right sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-5">
            <PriceSummary items={priceItems} taxRate={taxRate} deposit={deposit} />

            <CTAButton variant="terracotta" size="lg" fullWidth onClick={handlePay}>
              Pay ₹{payAmount.toLocaleString('en-IN')}
            </CTAButton>

            <CTAButton variant="outline" size="md" fullWidth onClick={onBack}>
              ← Back to Review
            </CTAButton>

            <p className="text-xs text-center text-charcoal-light">
              By clicking Pay, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}