import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log(error);
    if (error.response && error.response.status == 401) {
      localStorage.removeItem("accessToken");
      location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const setPrivateHeaders = () => {
  let token = localStorage.getItem("accessToken");
  axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
