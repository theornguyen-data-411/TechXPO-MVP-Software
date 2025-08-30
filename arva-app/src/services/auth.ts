import { LoginCredentials, User } from '../types';
import { api } from './api';

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Kai Nguyen',
  email: 'khainguyen@lucen.vn',
  avatar: 'https://via.placeholder.com/100',
};

export const authService = {
  // Mock login function
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (credentials.email === 'admin@arvaapp.vn' && credentials.password === 'password') {
      const token = 'mock-jwt-token-' + Date.now();
      return { user: mockUser, token };
    }
    
    throw new Error('Invalid credentials');
  },

  // Mock logout function
  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Clear token from storage
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Mock get current user
  async getCurrentUser(): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  },

  // Real API functions (commented out for now)
  /*
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },
  */
}; 