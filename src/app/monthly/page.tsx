'use client';
import NavBottom from '@/components/NavBottom';
import Calender from '@/containers/Calender';

const Monthly = () => {
  return (
    <main className="w-mobile h-mobile">
      <section className="h-[calc(100%-5.875rem)] flex flex-col justify-center items-center">
        <div className="text-2xl font-bold">Monthly</div>
        <Calender />
      </section>
      <NavBottom />
    </main>
  );
};

export default Monthly;
