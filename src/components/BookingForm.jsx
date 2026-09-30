/**
 * BookingForm – ONE reusable form driven by a config object.
 * Each service page passes its own config with fields, labels, validation rules, and CTA text.
 */
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import CTAButton from './CTAButton';

export default function BookingForm({ config, initialValues = {}, onSubmit }) {
  const { selectedLocation } = useApp();

  // Initialize form state from config fields
  const getInitialState = () => {
    const state = {};
    config.fields.forEach((field) => {
      state[field.name] = initialValues[field.name] || (field.name === 'location' ? selectedLocation || '' : '');
    });
    return state;
  };

  const [formData, setFormData] = useState(getInitialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const field = config.fields.find((f) => f.name === name);
    if (field && field.validate) {
      const error = field.validate(formData[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let hasError = false;
    config.fields.forEach((field) => {
      if (field.validate) {
        const error = field.validate(formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
          hasError = true;
        }
      }
    });

    setErrors(newErrors);
    setTouched(
      config.fields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})
    );

    if (!hasError) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    const error = touched[field.name] && errors[field.name];
    const baseClasses = `w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none text-charcoal ${
      error ? 'border-red-400 bg-red-50/50' : 'border-cream-dark focus:border-sage bg-white'
    }`;

    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            className={`${baseClasses} cursor-pointer`}
          >
            <option value="">Select {field.label}</option>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder || ''}
            rows={3}
            className={baseClasses}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            min={field.min}
            max={field.max}
            className={baseClasses}
          />
        );

      default:
        return (
          <input
            type={field.type || 'text'}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder || ''}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {config.fields.map((field) => {
          // Full-width for textareas
          const isFullWidth = field.type === 'textarea';
          return (
            <div key={field.name} className={isFullWidth ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                {field.label}
                {field.validate && field.validate('') ? (
                  <span className="text-terracotta ml-1">*</span>
                ) : null}
              </label>
              {renderField(field)}
              {touched[field.name] && errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4">
        <CTAButton type="submit" variant="primary" size="lg" fullWidth>
          {config.ctaText}
        </CTAButton>
      </div>
    </form>
  );
}