/**
 * CTAButton – Reusable call-to-action button with variants.
 */
import { Link } from 'react-router-dom';

export default function CTAButton({
  children,
  to,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'terracotta'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}) {
  const base =
    'inline-flex items-center justify-center font-body font-semibold rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: 'bg-sage text-white hover:bg-sage-dark shadow-md hover:shadow-lg',
    secondary: 'bg-cream-dark text-charcoal hover:bg-sage hover:text-white',
    outline: 'border-2 border-sage text-sage hover:bg-sage hover:text-white',
    terracotta: 'bg-terracotta text-white hover:bg-terracotta-dark shadow-md hover:shadow-lg',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}