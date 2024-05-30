'use client';
import NavBottom from '@/components/NavBottom';

const Monthly = () => {
  return (
    <main className="w-mobile h-mobile">
      <section className="h-[calc(100%-5.875rem)] flex flex-col justify-center items-center">
        <div>달력</div>
      </section>
      <NavBottom />
    </main>
  );
};

export default Monthly;
