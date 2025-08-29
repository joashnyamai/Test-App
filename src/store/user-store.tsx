import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  phone?: string;
  location?: string;
  bio?: string;
  company?: string;
  profileImage?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  lastActive?: Date;
}

interface UserStore {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUserByEmail: (email: string) => User | undefined;
  updateCurrentUser: (updates: Partial<User>) => void;
  syncUserFromLocalStorage: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      
      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          isEmailVerified: false,
          isPhoneVerified: false,
          lastActive: new Date(),
        };
        
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },
      
      login: async (email, password) => {
        try {
          const response = await fetch("https://qa-backend-q2ae.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          
          if (!response.ok) {
            console.error("Login failed:", data);
            return false;
          }

          // Helper function to normalize user data
          const normalizeUserData = (userData: any): User => {
            return {
              id: userData.id || userData._id || Math.random().toString(36).substr(2, 9),
              firstName: userData.firstName || userData.name?.split(' ')[0] || 'User',
              lastName: userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '',
              username: userData.username || userData.email?.split('@')[0] || 'user',
              email: userData.email || '',
              password: userData.password || '',
              role: userData.role || 'QA Tester',
              createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
              phone: userData.phone || '',
              location: userData.location || '',
              bio: userData.bio || '',
              company: userData.company || '',
              profileImage: userData.profileImage || userData.avatar || null,
              isEmailVerified: userData.isEmailVerified || false,
              isPhoneVerified: userData.isPhoneVerified || false,
              lastActive: userData.lastActive ? new Date(userData.lastActive) : new Date(),
            };
          };

          // Extract token from various possible field names
          const token = data.token || data.accessToken || data.access_token || data.data?.token;
          
          if (token) {
            localStorage.setItem('token', token);
            
            // Store user data if available
            if (data.user) {
              const userData = normalizeUserData(data.user);
              localStorage.setItem('user', JSON.stringify(userData));
              set({ currentUser: userData });
            }
            
            return true;
          }
          
          // If no token but we have user data with _id, use _id as token
          if (data.user && data.user._id) {
            localStorage.setItem('token', data.user._id);
            const userData = normalizeUserData(data.user);
            localStorage.setItem('user', JSON.stringify(userData));
            set({ currentUser: userData });
            return true;
          }
          
          // If no token but we have user data with id, use id as token
          if (data.user && data.user.id) {
            localStorage.setItem('token', data.user.id);
            const userData = normalizeUserData(data.user);
            localStorage.setItem('user', JSON.stringify(userData));
            set({ currentUser: userData });
            return true;
          }
          
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },
      
      logout: () => {
        set({ currentUser: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },
      
      getUserByEmail: (email) => {
        return get().users.find(u => u.email === email);
      },
      
      updateCurrentUser: (updates: Partial<User>) => {
        set((state) => {
          if (!state.currentUser) return state;
          
          const updatedUser = {
            ...state.currentUser,
            ...updates,
            lastActive: new Date(),
          };
          
          // Update localStorage to keep it in sync
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          return { currentUser: updatedUser };
        });
      },
      
      syncUserFromLocalStorage: () => {
        try {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            set({ currentUser: userData });
          }
        } catch (error) {
          console.error("Error syncing user from localStorage:", error);
        }
      },
      
      // Helper method to normalize user data from backend responses
      normalizeUserData: (userData: any): User => {
        return {
          id: userData.id || userData._id || Math.random().toString(36).substr(2, 9),
          firstName: userData.firstName || userData.name?.split(' ')[0] || 'User',
          lastName: userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '',
          username: userData.username || userData.email?.split('@')[0] || 'user',
          email: userData.email || '',
          password: userData.password || '',
          role: userData.role || 'QA Tester',
          createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
          company: userData.company || '',
          profileImage: userData.profileImage || userData.avatar || null,
          isEmailVerified: userData.isEmailVerified || false,
          isPhoneVerified: userData.isPhoneVerified || false,
          lastActive: userData.lastActive ? new Date(userData.lastActive) : new Date(),
        };
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
