import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SECRET = process.env.SEED_SECRET || "";

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (key !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Admin
    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD || "admin12345";
    const hash = await bcrypt.hash(password, 10);

    await prisma.user.upsert({
      where: { email },
      update: { isAdmin: true, password: hash },
      create: { email, password: hash, isAdmin: true, name: "Admin" }
    });

    // Slides demo
    await prisma.heroSlide.createMany({
      data: [
        {
          imageUrl: "/placeholders/slide1.jpg",
          title: "Novedades de Agosto",
          subtitle: "Reserva tu set antes de que vuele",
          ctaLabel: "Ver pre-orders",
          ctaHref: "/productos?preorder=true",
          position: 0
        },
        {
          imageUrl: "/placeholders/slide2.jpg",
          title: "TCG Myths Blog",
          subtitle: "Noticias y artículos",
          ctaLabel: "Leer ahora",
          ctaHref: "/blog",
          position: 1
        }
      ],
      skipDuplicates: true
    });

    // Productos demo
    await prisma.product.createMany({
      data: [
        {
          name: "Booster Box – Set Épico",
          slug: "booster-box-set-epico",
          description: "Caja de sobres del nuevo set. Incluye 36 sobres.",
          priceCents: 12999,
          stock: 20,
          imageUrl: "/placeholders/box1.jpg",
          published: true
        },
        {
          name: "Carta Promo Mítica",
          slug: "carta-promo-mitica",
          description: "Edición limitada, foil.",
          priceCents: 2999,
          stock: 0,
          imageUrl: "/placeholders/card1.jpg",
          published: true
        },
        {
          name: "Pre-order: Set Especial",
          slug: "preorder-set-especial",
          description: "Reserva hasta el 31/08.",
          priceCents: 14999,
          pricePreorderCents: 12999,
          stock: 0,
          isPreorder: true,
          preorderStart: new Date(),
          preorderEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          preorderCap: 100,
          imageUrl: "/placeholders/preorder.jpg",
          published: true
        }
      ],
      skipDuplicates: true
    });

    return NextResponse.json({ ok: true, message: "Seed done ✅" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
