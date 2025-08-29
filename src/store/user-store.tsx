import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

interface UserStore {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUserByEmail: (email: string) => User | undefined;
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

      // Extract token from various possible field names
      const token = data.token || data.accessToken || data.access_token || data.data?.token;
      
      if (token) {
        localStorage.setItem('token', token);
        
        // Store user data if available
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          set({ currentUser: data.user });
        }
        
        return true;
      }
      
      // If no token but we have user data with _id, use _id as token
      if (data.user && data.user._id) {
        localStorage.setItem('token', data.user._id);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ currentUser: data.user });
        return true;
      }
      
      // If no token but we have user data with id, use id as token
      if (data.user && data.user.id) {
        localStorage.setItem('token', data.user.id);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({ currentUser: data.user });
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
      },
      
      getUserByEmail: (email) => {
        return get().users.find(u => u.email === email);
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
