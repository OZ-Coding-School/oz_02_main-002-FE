'use client';
import NavBottom from '@/components/NavBottom';
import { usePathname } from 'next/navigation';

const Monthly = () => {
  const pathname = usePathname();

  return (
    <main className="w-mobile h-mobile">
      <section className="h-[46.875rem] flex flex-col justify-center items-center">
        <div>달력</div>
      </section>
      <NavBottom pathname={pathname} />
    </main>
  );
};

export default Monthly;
