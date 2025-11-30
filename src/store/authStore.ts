import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/type';

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,

      login: (user: User, token: string) => {
        localStorage.setItem('accessToken', token);
        set({ isAuthenticated: true, user, accessToken: token });
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        set({ isAuthenticated: false, user: null, accessToken: null });
      },

      checkAuth: () => {
        const token = localStorage.getItem('accessToken');
        return !!token && get().isAuthenticated;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
