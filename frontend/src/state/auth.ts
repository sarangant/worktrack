import { atom, getDefaultStore } from 'jotai';
import type { User } from '../types';
import { Roles } from '../types';

export type AuthState = {
  accessToken: string | null;
  user: User | null;
};

export const authAtom = atom<AuthState>({
  accessToken: null,
  user: null,
});

const store = getDefaultStore();

export function useAuth() {
  return store.get(authAtom);
}

export function setAuthToken(token: string, user: User) {
  store.set(authAtom, { accessToken: token, user });
  localStorage.setItem('accessToken', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuthToken() {
  store.set(authAtom, { accessToken: null, user: null });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
}

export function getAuthToken() {
  const state = store.get(authAtom);
  return state.accessToken;
}

export function loadPersistedAuth() {
  const token = localStorage.getItem('accessToken');
  const userRaw = localStorage.getItem('user');
  if (token && userRaw) {
    try {
      const user = JSON.parse(userRaw) as User;
      store.set(authAtom, { accessToken: token, user });
    } catch {
      clearAuthToken();
    }
  }
}

export function isAdmin(user?: User | null) {
  return user?.role === Roles.Admin;
}
