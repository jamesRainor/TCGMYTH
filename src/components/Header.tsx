
'use client';
import Link from 'next/link';
import { Logo } from './Logo';
import { ShoppingCart } from 'lucide-react';

export function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/"><Logo className="h-12" /></Link>
        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link href="/">Inicio</Link>
          <Link href="/productos">Tienda</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/carrito" aria-label="Carrito" className="relative"><ShoppingCart size={22} /></Link>
        </nav>
      </div>
    </header>
  );
}
