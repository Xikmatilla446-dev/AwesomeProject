import axios from "axios"
const KEY = '&client_id=wi1reg9DSyIP93cgaWj3YV3ifinz51z8rXQU1fdrKcE';
const URL = 'https://api.unsplash.com/search/photos?query=uzbekistan';



export const requestApi = axios.create({
  baseURL: `${URL}${KEY}&per_page=100&page=${1}`,
  headers: {
    common: {
      Authorization: "Bearer "
    }
  }
});



export const requestHelper = axios.create({
  baseURL: `https://api.unsplash.com/photos`,
});

requestApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${null}`;
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
