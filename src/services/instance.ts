import { accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import _axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';

_axios.defaults.xsrfCookieName = 'csrftoken';
_axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const axios = _axios.create({
  baseURL: 'https://api.oz-02-main-04.xyz/api/v1/',
  timeout: 0,
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(
  config => {
    // const [accessToken] = useAtom(accessTokenAtom);
    // const [csrfToken] = useAtom(csrfTokenAtom);
    // if (accessToken && csrfToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    //   config.headers['x-csrftoken'] = `${csrfToken}`;
    // }
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4Mzg5MDI5LCJpYXQiOjE3MTgzNTMwMjksImp0aSI6IjRiY2QyZTU0MzFjNjQ3MjA5Y2E2ZmUyNzgzNThkMWRmIiwidXNlcl9pZCI6NX0.UZSqmrmc50fLJy9zeHOvoPpP8l4jRdrtkEOSSYIcHNo`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  error => {
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
  },
);
