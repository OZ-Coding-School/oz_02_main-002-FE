import { accessTokenAtom } from '@/atoms/atoms';
import axios from 'axios';
import { useAtom } from 'jotai';

export const postsClient = axios.create({
  baseURL: '/api',
  timeout: 0,
  headers: {
    Accept: 'application/json',
  },
});
