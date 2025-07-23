
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main(){
  const adminEmail = process.env.ADMIN_EMAIL as string;
  const adminPass  = process.env.ADMIN_PASSWORD as string;
  const hash = adminPass ? await bcrypt.hash(adminPass,10):undefined;
  await prisma.user.upsert({
    where:{email:adminEmail},
    update:{isAdmin:true,password:hash},
    create:{email:adminEmail,isAdmin:true,password:hash,name:'Admin'}
  });
  await prisma.product.createMany({
    data:[
      { name:'Booster Box – Set Épico', slug:'booster-box-set-epico', description:'Caja de sobres del nuevo set. Incluye 36 sobres.', priceCents:12999, stock:20, imageUrl:'/placeholders/box1.jpg' },
      { name:'Carta Promo Mítica', slug:'carta-promo-mitica', description:'Edición limitada, foil.', priceCents:2999, stock:0, published:true, imageUrl:'/placeholders/card1.jpg' },
      { name:'Pre-order: Set Especial', slug:'preorder-set-especial', description:'Reserva hasta el 31/08.', priceCents:14999, pricePreorderCents:12999, stock:0, isPreorder:true, preorderStart:new Date(), preorderEnd:new Date(new Date().setMonth(new Date().getMonth()+1)), preorderCap:100, imageUrl:'/placeholders/preorder.jpg' }
    ],
    skipDuplicates:true
  });
  await prisma.heroSlide.createMany({
    data:[
      { imageUrl:'/placeholders/slide1.jpg', title:'Novedades de Agosto', subtitle:'Reserva tu set antes de que vuele', ctaLabel:'Ver pre-orders', ctaHref:'/productos?preorder=true', position:0 },
      { imageUrl:'/placeholders/slide2.jpg', title:'TCG Myths Blog', subtitle:'Noticias y artículos', ctaLabel:'Leer ahora', ctaHref:'/blog', position:1 }
    ]
  });
  console.log('Seed done ✅');
}
main().catch(e=>{console.error(e);process.exit(1);}).finally(async()=>{await prisma.$disconnect();});
