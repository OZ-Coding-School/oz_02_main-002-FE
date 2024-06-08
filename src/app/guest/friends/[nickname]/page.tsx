'use client';
import { usePathname } from 'next/navigation';

interface NickNamePageProps {
  params: {
    nickName: string;
  };
}

export default function NickNamePage() {
  const pathname = usePathname();
  return (
    <div>
      <div>{pathname}</div>
    </div>
  );
}
