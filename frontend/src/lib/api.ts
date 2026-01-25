import axios, { AxiosHeaders, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { getAuthToken, setAuthToken, clearAuthToken } from '../state/auth';
import { Roles } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();
  const headers = config.headers instanceof AxiosHeaders ? config.headers : new AxiosHeaders(config.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers = headers;
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: unknown) => {
    const err = error as { response?: { status?: number } };
    if (err.response?.status === 401) {
      clearAuthToken();
    }
    return Promise.reject(error);
  },
);

export type LoginPayload =
  | { email: string; password: string; employeeId?: never }
  | { employeeId: string; password: string; email?: never };

export async function loginRequest(payload: LoginPayload) {
  const dummyToken = 'dummy-token';
  const role = payload.employeeId ? Roles.Employee : Roles.Admin;
  const user = {
    id: payload.employeeId ?? 'admin',
    name: payload.employeeId ? 'Medarbejder' : 'Administrator',
    email: payload.email ?? 'employee@company.com',
    role: role as 'admin' | 'employee',
  };
  setAuthToken(dummyToken, user);
  return { accessToken: dummyToken, user };
}

export default api;
