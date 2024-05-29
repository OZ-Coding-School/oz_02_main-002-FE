import { useRouter } from 'next/navigation';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { BiCalendarCheck, BiSolidCalendarCheck, BiSolidUser } from 'react-icons/bi';
import { BsListTask, BsListUl } from 'react-icons/bs';
import { LiaHomeSolid } from 'react-icons/lia';

interface NavBottomProps {
  pathname: string;
}

const NavBottom = ({ pathname }: NavBottomProps) => {
  const router = useRouter();
  return (
    <div className="h-navigation">
      <div className="w-full h-[3.75rem] flex justify-around">
        <button className="w-16 flex justify-center items-center" onClick={() => router.push('/')}>
          {pathname === '/' ? <AiFillHome size={32} color="#873DFF" /> : <LiaHomeSolid size={32} />}
        </button>
        <button className="w-16 flex justify-center items-center" onClick={() => router.push('/monthly')}>
          {pathname === '/monthly' ? <BiSolidCalendarCheck size={32} color="#873DFF" /> : <BiCalendarCheck size={32} />}
        </button>
        <button className="w-16 flex justify-center items-center" onClick={() => router.push('/todolist')}>
          {pathname === '/todolist' ? <BsListUl size={32} color="#873DFF" /> : <BsListTask size={32} />}
        </button>
        <button className="w-16 flex justify-center items-center" onClick={() => router.push('/mypage')}>
          {pathname === '/mypage' ? <BiSolidUser size={32} color="#873DFF" /> : <AiOutlineUser size={32} />}
        </button>
      </div>
    </div>
  );
};

export default NavBottom;
