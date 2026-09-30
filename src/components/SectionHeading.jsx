/**
 * SectionHeading – Reusable section title with optional subtitle.
 */
export default function SectionHeading({ title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <p className={`text-sm uppercase tracking-widest mb-2 ${light ? 'text-sage-light' : 'text-terracotta'} font-medium`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl font-bold ${light ? 'text-cream' : 'text-charcoal'}`}>
        {title}
      </h2>
    </div>
  );
}