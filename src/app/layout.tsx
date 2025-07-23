
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = { title:'TCG Myths', description:'Tienda TCG' };

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="es">
      <body className="bg-content min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
