/**
 * ReviewSummary – Displays all booking details for review before payment.
 */
import CTAButton from './CTAButton';
import PriceSummary from './PriceSummary';

export default function ReviewSummary({
  bookingData,
  config,
  priceItems,
  taxRate = 0.18,
  deposit,
  onConfirm,
  onBack,
}) {
  // Build display-friendly labels
  const fieldLabels = {};
  config.fields.forEach((f) => {
    fieldLabels[f.name] = f.label;
  });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Details card */}
      <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-6 mb-6">
        <h3 className="font-heading text-xl font-bold text-charcoal mb-4">Booking Details</h3>
        <div className="space-y-3">
          {Object.entries(bookingData).map(([key, value]) => {
            if (!value || !fieldLabels[key]) return null;
            return (
              <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <span className="text-sm font-medium text-charcoal-light min-w-[160px]">
                  {fieldLabels[key]}:
                </span>
                <span className="text-sm text-charcoal">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      {priceItems && priceItems.length > 0 && (
        <div className="mb-6">
          <PriceSummary items={priceItems} taxRate={taxRate} deposit={deposit} />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <CTAButton variant="outline" size="lg" onClick={onBack} className="flex-1">
          ← Back to Edit
        </CTAButton>
        <CTAButton variant="primary" size="lg" onClick={onConfirm} className="flex-1">
          Proceed to Payment
        </CTAButton>
      </div>
    </div>
  );
}