import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "../pages/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  delete<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export const http: HttpClient = axiosInstance;

http.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["X-TOKS-AUTH-TOKEN"] = accessToken;
    http.defaults.headers.common["X-TOKS-AUTH-TOKEN"] = accessToken;
  }
  return config;
});

http.interceptors.response.use((response) => response.data);
