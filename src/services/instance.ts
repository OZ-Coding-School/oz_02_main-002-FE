import { accessTokenAtom } from '@/atoms/atoms';
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
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4Mjk5NTQwLCJpYXQiOjE3MTgyNjM1NDAsImp0aSI6Ijg5NTBmYmY5NTM1NzQxNTdiZDA4NjkwMjljNDk0OWZlIiwidXNlcl9pZCI6MTF9.QtmX9r-N0__MKNPbg04SoDV_MgwGLOH9k0ijH7MVPQo`;
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
