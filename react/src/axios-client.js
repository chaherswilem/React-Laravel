import axios from "axios";
import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  console.log("Token:", token); // for debugging
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        // Handle 401 Unauthorized
      } else if (response.status === 404) {
        // Handle 404 Not Found
      } else if (response.status >= 500) {
        // Handle other server errors (status code 500 and above)
      }
    } else {
      // Handle network errors or other cases where no response is received
    }

    throw error;
  }
);

export default axiosClient;
