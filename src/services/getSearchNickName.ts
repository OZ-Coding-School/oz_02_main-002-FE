import { AxiosError } from 'axios';
import { calendarClient } from './instance';
import { useQuery } from '@tanstack/react-query';

const fetchNicknameList = async (nickname: string) => {
  try {
    const response = await calendarClient.get(`guestbook/${nickname}`, {
      withXSRFToken: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error Response:', axiosError.response.data);
      console.error('Status:', axiosError.response.status);
      console.error('Headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      console.error('Error Request:', axiosError.request);
    } else {
      console.error('Error Message:', axiosError.message);
    }
  }
};

export const useGetSearchNickName = (nickname: string) => {
  return useQuery({
    queryKey: ['nicknameList', nickname],
    queryFn: () => fetchNicknameList(nickname),
    enabled: false,
  });
};