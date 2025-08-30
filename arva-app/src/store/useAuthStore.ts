import { create } from 'zustand';
import { AuthState, LoginCredentials, User } from '../types';
import { authService } from '../services/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authService.login(credentials);
      
      // Store token
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      // Still clear local state even if API call fails
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  clearUser: () => {
    set({ user: null, isAuthenticated: false });
  },
})); 