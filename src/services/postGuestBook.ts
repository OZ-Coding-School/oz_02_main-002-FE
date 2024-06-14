import { GuestBookListType } from '@/types/guestBookType';
import { axios } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchGuestBook = async (user_id: number) => {
  try {
    const response = await axios.get<GuestBookListType[]>(`guestbook/comments/${user_id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetGuestBook = (user_id: number) => {
  return useQuery({
    queryKey: ['guestBook', user_id],
    queryFn: () => fetchGuestBook(user_id),
  });
};
