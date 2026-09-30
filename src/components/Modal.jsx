/**
 * Modal – Reusable modal overlay component.
 */
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream-dark">
            <h3 className="font-heading text-xl font-bold text-charcoal">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-cream-dark transition-colors cursor-pointer"
            >
              <X size={20} className="text-charcoal-light" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}