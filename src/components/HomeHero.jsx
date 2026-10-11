import { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&h=900&fit=crop', // Replace with Karnal Cafe Photo
    location: 'Karnal',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=900&fit=crop', // Replace with Panipat Cafe Photo
    location: 'Panipat',
  },
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&fit=crop', // Replace with Gharaunda Cafe Photo
    location: 'Gharaunda',
  },
];

export default function HomeHero({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Sliding Backgrounds */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-widest text-cream-dark/90 mb-4 font-medium transition-all">
          Serving at: {slides[currentSlide].location}
        </p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Where Every Meal Tells a Story
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Farm to Fork is a destination for great food, creative experiences, celebrations, and beautifully curated gatherings.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {children}
        </div>
      </div>
    </section>
  );
}