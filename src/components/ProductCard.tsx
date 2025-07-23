
import Link from 'next/link';
import { Product } from '@prisma/client';

export default function ProductCard({ product }: { product: Product }){
  const soldOut = product.stock <= 0 && !product.isPreorder;
  const isPre = product.isPreorder;
  const price = isPre && product.pricePreorderCents ? product.pricePreorderCents : product.priceCents;
  return (
    <Link href={`/productos/${product.slug}`} className={`border rounded-md p-3 bg-white shadow-sm relative ${soldOut?'opacity-60 pointer-events-none':''}`}>
      {isPre && <span className="absolute left-2 top-2 bg-preorder text-white text-xs px-2 py-1 rounded">Pre-order</span>}
      {soldOut && <span className="absolute left-2 top-2 bg-soldout text-white text-xs px-2 py-1 rounded">Agotado</span>}
      <img src={product.imageUrl ?? '/placeholders/card1.jpg'} alt={product.name} className="w-full h-40 object-cover mb-3" />
      <h3 className="font-semibold mb-1">{product.name}</h3>
      <p className="text-sm mb-2 line-clamp-2">{product.description}</p>
      <p className="font-bold">{(price/100).toFixed(2)} €</p>
    </Link>
  );
}
