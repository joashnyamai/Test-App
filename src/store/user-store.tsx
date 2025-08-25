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
  login: (email: string, password: string) => boolean;
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
      
      login: (email, password) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ currentUser: user });
          localStorage.setItem('token', user.id);
          return true;
        }
        return false;
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
