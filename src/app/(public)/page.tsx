
import { HeroCarousel } from '@/components/HeroCarousel';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export default async function HomePage(){
  const slides = await prisma.heroSlide.findMany({ where:{ isActive:true }, orderBy:{ position:'asc' } });
  const products = await prisma.product.findMany({ where:{ published:true }, take:8 });
  return (
    <div>
      <HeroCarousel slides={slides} />
      <section className="container mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
    </div>
  );
}
