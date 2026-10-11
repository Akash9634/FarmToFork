import SectionHeading from './SectionHeading';

// Placeholders – client will provide real photos later
const placeholders = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=500&fit=crop',
];

export default function PastEventsGallery({ title = "Our Past Events", subtitle = "Memories" }) {
  return (
    <section className="py-16 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={title} subtitle={subtitle} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {placeholders.map((img, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer shadow-sm">
              <img 
                src={img} 
                alt={`Past Event ${i + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-charcoal-light mt-6 italic">
          *Real event gallery photos will be uploaded here.
        </p>
      </div>
    </section>
  );
}