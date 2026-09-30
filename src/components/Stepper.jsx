/**
 * Stepper – Progress indicator for booking flow.
 */
import { Check } from 'lucide-react';

const defaultSteps = ['Details', 'Review', 'Payment', 'Confirmation'];

export default function Stepper({ steps = defaultSteps, currentStep = 0 }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isCompleted
                    ? 'bg-sage text-white'
                    : isCurrent
                    ? 'bg-sage text-white ring-4 ring-sage/20'
                    : 'bg-cream-dark text-charcoal-light'
                }`}
              >
                {isCompleted ? <Check size={18} /> : index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent ? 'text-sage' : isCompleted ? 'text-sage-light' : 'text-charcoal-light'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 md:w-20 h-0.5 mx-2 mb-6 ${
                  isCompleted ? 'bg-sage' : 'bg-cream-dark'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}