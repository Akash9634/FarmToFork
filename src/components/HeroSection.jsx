/**
 * HeroSection – Large hero banner with title, subtitle, and CTA buttons.
 */
export default function HeroSection({
  title,
  subtitle,
  description,
  imageUrl,
  children, // for CTA buttons
  overlay = true,
  height = 'min-h-[70vh]',
}) {
  return (
    <section
      className={`relative ${height} flex items-center justify-center overflow-hidden`}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient background fallback */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage-dark to-charcoal" />
      )}

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-widest text-cream-dark/90 mb-4 font-medium">
            {subtitle}
          </p>
        )}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="flex flex-wrap items-center justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}