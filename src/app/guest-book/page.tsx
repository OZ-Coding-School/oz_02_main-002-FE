'use client';
import GuestListItem from '@/components/GuestListItem';
import NavBottom from '@/components/NavBottom';
import { FaUserFriends } from 'react-icons/fa';

export default function GuestBook() {
  let guestBookList = [
    {
      name: '방명록1',
      date: '2021-08-01',
      content: '안녕하세요',
    },
    {
      name: '방명록2',
      date: '2021-08-02',
      content: '안녕하세요',
    },
    {
      name: '방명록3',
      date: '2021-08-03',
      content: '안녕하세요',
    },
  ];
  return (
    <main className="w-full h-full">
      <section className="wrap-section relative">
        <div className="w-full h-full bg-saturdayBlue absolute">배경</div>
        <div className="w-full h-[calc(100%-2.6875rem)] absolute z-10 pt-11 px-[1.4375rem]">
          <button className="h-[3.3125rem] bg-white bg-opacity-70 rounded-[0.625rem] font-semibold flex items-center ml-auto px-[0.625rem]">
            친구 방명록 놀러가기
            <span className="ml-2">
              <FaUserFriends size={32} />
            </span>
          </button>
          <div className="w-[21.5rem] h-[34.6875rem] rounded-[5px] bg-white border border-black-200 mt-[1.375rem]">
            <ul className="py-3">
              {guestBookList.map((item, index) => {
                return (
                  <li key={index} className="border-b-[0.5px] border-black-200">
                    <GuestListItem item={item} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full h-[2.6875rem] border-y border-black-200 bg-white absolute bottom-0">공통 컴포넌트</div>
      </section>
      <NavBottom />
    </main>
  );
}
