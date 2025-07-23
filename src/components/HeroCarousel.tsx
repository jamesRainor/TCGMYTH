
'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type Slide = { id:string; imageUrl:string; title?:string|null; subtitle?:string|null; ctaLabel?:string|null; ctaHref?:string|null };

export function HeroCarousel({ slides }: { slides: Slide[] }){
  const [emblaRef] = useEmblaCarousel({ loop:true }, [Autoplay({ delay:5000 })]);
  return (
    <div className="relative w-full" ref={emblaRef}>
      <div className="flex">
        {slides.map(s => (
          <div key={s.id} className="min-w-full relative">
            <img src={s.imageUrl} alt={s.title ?? ''} className="w-full h-[380px] object-cover" />
            {(s.title || s.subtitle || s.ctaLabel) && (
              <div className="absolute inset-0 flex flex-col items-start justify-center gap-2 p-6 bg-black/30 text-white">
                {s.title && <h2 className="text-3xl md:text-4xl font-semibold">{s.title}</h2>}
                {s.subtitle && <p className="max-w-lg">{s.subtitle}</p>}
                {s.ctaHref && s.ctaLabel && <a href={s.ctaHref} className="mt-2 inline-block rounded-md bg-white px-4 py-2 text-black">{s.ctaLabel}</a>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
