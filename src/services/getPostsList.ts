import { AxiosError } from 'axios';
import { postsClient } from './instance';

export async function getPostsList(userId: number | undefined) {
  try {
    const response = await postsClient.get(`/posts/3`, {
      withCredentials: true,
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
}
