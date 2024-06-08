import { useRouter } from 'next/navigation';

export default function NickNameList() {
  const router = useRouter();
  const nickNames = [
    'nickname1',
    '닉네임2',
    '닉네임3',
    '닉네임4',
    '닉네임5',
    '닉네임6',
    '닉네임7',
    '닉네임8',
    '닉네임9',
    '닉네임10',
    '닉네임11',
    '닉네임12',
  ];

  return (
    <ul className="w-full h-[31.25rem] border-b border-black-200 overflow-auto scroll-bar">
      {nickNames.map((nickName, index) => {
        return (
          <li
            onClick={() => router.push(`/guest/friends/${nickName}`)}
            key={index}
            className="h-[3.6875rem] border-b-[0.5px] border-black-200 text-lg flex items-center pl-[0.8125rem] cursor-pointer active:bg-primary-200 active:text-white">
            {nickName}
          </li>
        );
      })}
    </ul>
  );
}
