import { accessTokenAtom } from '@/atoms/atoms';
import axios from 'axios';
import { useAtom } from 'jotai';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const calendarClient = axios.create({
  baseURL: 'https://api.oz-02-main-04.xyz/api/v1/',
  timeout: 0,
  headers: {
    Accept: 'application/json',
  },
});

calendarClient.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjkwOTAyLCJpYXQiOjE3MTgyNTQ5MDIsImp0aSI6IjE1OTIwOGYwMmQ1YzQzODE5YzU0MGFjNmJlMjkyYzcyIiwidXNlcl9pZCI6Mn0.a13_TIc4u7SZcvBFVI12bnvdBrYalg_-4vSwLNyWlOs`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
