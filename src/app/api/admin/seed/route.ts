import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SECRET = process.env.SEED_SECRET || '';

export const dynamic = 'force-dynamic'; // evita prerender

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (key !== SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const email = process.env.ADMIN_EMAIL!;
    const pass  = process.env.ADMIN_PASSWORD || 'admin12345';
    const hash  = await bcrypt.hash(pass, 10);

    await prisma.user.upsert({
      where: { email },
      update: { isAdmin: true, password: hash },
      create: { email, password: hash, isAdmin: true, name: 'Admin' },
    });

    await prisma.heroSlide.createMany({
      data: [
        { imageUrl:'/placeholders/slide1.jpg', title:'Novedades', subtitle:'Reserva tu set antes de que vuele', ctaLabel:'Ver pre-orders', ctaHref:'/productos?preorder=true', position:0, isActive:true },
        { imageUrl:'/placeholders/slide2.jpg', title:'Blog TCG Myths', subtitle:'Noticias y artículos', ctaLabel:'Leer ahora', ctaHref:'/blog', position:1, isActive:true },
      ],
      skipDuplicates: true,
    });

    await prisma.product.createMany({
      data: [
        { name:'Booster Box – Set Épico', slug:'booster-box-set-epico', description:'Caja de sobres, 36 packs.', priceCents:12999, stock:20, imageUrl:'/placeholders/box1.jpg', published:true },
        { name:'Carta Promo Mítica', slug:'carta-promo-mitica', description:'Edición limitada foil.', priceCents:2999, stock:0, imageUrl:'/placeholders/card1.jpg', published:true },
      ],
      skipDuplicates: true,
    });

    return new Response(JSON.stringify({ ok: true, message: 'Seed done ✅' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
