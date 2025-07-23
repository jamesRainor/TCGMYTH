import Image from 'next/image';
export function Logo({variant='full',className=''}:{variant?:'full'|'footer'|'icon',className?:string}){
  const src = variant==='footer'?'/logo-footer.png':variant==='icon'?'/logo-icon-256.png':'/logo-full.png';
  return <Image src={src} alt='TCG Myths' width={0} height={0} sizes='100vw' className={className+' w-auto h-auto'} priority />;
}
