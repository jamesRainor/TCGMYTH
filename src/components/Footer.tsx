
import { Logo } from './Logo';

export function Footer(){
  return (
    <footer className="bg-white border-t py-10 mt-16">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <Logo variant="footer" className="h-8 mb-3" />
          <p>TCG Myths</p>
          <p>C/ Arcana 123, 08000 Ciudad</p>
          <p>NIF: X1234567Z</p>
          <p>Tel: +34 600 123 456</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Políticas</h4>
          <ul className="space-y-1">
            <li><a href="#">Envíos y devoluciones</a></li>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Términos y condiciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Atención</h4>
          <ul className="space-y-1">
            <li>pedidos@tcgmyths.com</li>
            <li>Horario: L–V 10:00–19:00</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Reviews</h4>
          <p>★★★★☆ 4,8 / 5</p>
          <p className="italic">"Envío rápido y atención top." – J. Pérez</p>
          <a href="#" className="underline">Ver todas</a>
        </div>
      </div>
    </footer>
  );
}
