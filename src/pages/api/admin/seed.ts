import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SECRET = process.env.SEED_SECRET || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (req.query.key !== SECRET) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Admin
    const email = process.env.ADMIN_EMAIL!;
    const pass = process.env.ADMIN_PASSWORD || 'admin12345';
    const hash = await bcrypt.hash(pass, 10);

    await prisma.user.upsert({
      where: { email },
      update: { isAdmin: true, password: hash },
      create: { email, password: hash, isAdmin: true, name: 'Admin' }
    });

    // Slides demo
    await prisma.heroSlide.createMany({
      data: [
        {
          imageUrl: '/placeholders/slide1.jpg',
          title: 'Novedades',
          subtitle: 'Reserva tu set antes de que vuele',
          ctaLabel: 'Ver pre-orders',
          ctaHref: '/productos?preorder=true',
          position: 0
        },
        {
          imageUrl: '/placeholders/slide2.jpg',
          title: 'Blog TCG Myths',
          subtitle: 'Noticias y artículos',
          ctaLabel: 'Leer ahora',
          ctaHref: '/blog',
          position: 1
        }
      ],
      skipDuplicates: true
    });

    // Productos demo
    await prisma.product.createMany({
      data: [
        {
          name: 'Booster Box – Set Épico',
          slug: 'booster-box-set-epico',
          description: 'Caja de sobres, 36 packs.',
          priceCents: 12999,
          stock: 20,
          imageUrl: '/placeholders/box1.jpg',
          published: true
        },
        {
          name: 'Carta Promo Mítica',
          slug: 'carta-promo-mitica',
          description: 'Edición limitada foil.',
          priceCents: 2999,
          stock: 0,
          imageUrl: '/placeholders/card1.jpg',
          published: true
        }
      ],
      skipDuplicates: true
    });

    res.json({ ok: true, message: 'Seed done ✅' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    await prisma.$disconnect();
  }
}
