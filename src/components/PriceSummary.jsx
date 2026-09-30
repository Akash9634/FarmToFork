/**
 * PriceSummary – Displays itemised pricing, taxes, and total.
 */
export default function PriceSummary({ items = [], taxRate = 0.18, deposit = null, showTotal = true }) {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  return (
    <div className="bg-cream rounded-xl p-5 space-y-3">
      <h4 className="font-heading text-lg font-bold text-charcoal mb-2">Price Summary</h4>

      {items.map((item, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-charcoal-light">{item.label}</span>
          <span className="font-medium text-charcoal">₹{item.amount.toLocaleString('en-IN')}</span>
        </div>
      ))}

      {taxRate > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-charcoal-light">GST ({(taxRate * 100).toFixed(0)}%)</span>
          <span className="font-medium text-charcoal">₹{tax.toLocaleString('en-IN')}</span>
        </div>
      )}

      <div className="border-t border-sage/20 pt-3 flex justify-between">
        <span className="font-heading font-bold text-charcoal">Total</span>
        <span className="font-heading font-bold text-sage text-lg">₹{total.toLocaleString('en-IN')}</span>
      </div>

      {deposit && (
        <div className="bg-sage/10 rounded-lg p-3 mt-2">
          <div className="flex justify-between text-sm">
            <span className="text-sage-dark font-medium">{deposit.label}</span>
            <span className="font-bold text-sage-dark">₹{deposit.amount.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-charcoal-light mt-1">{deposit.note}</p>
        </div>
      )}
    </div>
  );
}