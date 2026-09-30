/**
 * ProcessingScreen – 2-3 second loader shown after clicking Pay.
 */
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProcessingScreen({ onComplete, duration = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mx-auto w-20 h-20 mb-6">
          <Loader2 size={80} className="text-sage animate-spin" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">Processing Payment...</h2>
        <p className="text-charcoal-light">Please wait while we confirm your payment</p>
        <p className="text-sm text-charcoal-light mt-4 bg-amber-50 px-4 py-2 rounded-lg inline-block">
          Demo Mode – Simulating payment processing
        </p>
      </div>
    </div>
  );
}