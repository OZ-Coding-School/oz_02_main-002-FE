import { guestBookListType } from '@/types/guestBookListType';
import { useEffect, useRef } from 'react';

export default function useMoveScrollBottom(guestBook: guestBookListType[]) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // 스크롤 자동 아래로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [guestBook]);

  return scrollRef;
}