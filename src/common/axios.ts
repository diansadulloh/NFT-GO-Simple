import axios, { AxiosResponse } from 'axios';
import storage from 'umbrella-storage';

const API_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://metadata-api.nftgo.io' : 'http://localhost:7001'

const instance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 60000
})


// instance.interceptors.request.use((config: AxiosRequestConfig) => {
//   const ind = URL_WHITE_LIST.findIndex(url => config.url.indexOf(url) >= 0);
//   if (ind < 0) {
//     const jwt = storage.getLocalStorage(JWT_KEY)
//     if (!jwt) {
//       window.location.href = '/#/login';
//       message.warn('请先登录');
//       return Promise.reject();
//     }
//     config.headers['authorization'] = `Bearer ${jwt}`;
//   }
//   return config;
// }, (e) => {
//   return Promise.reject(e);
// })

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.code === 0) {
    return response.data.data;
  }
  throw new Error(response.data.msg);
}, (e) => {
  return Promise.reject(e);
})

export default instance;