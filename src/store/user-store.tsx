import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { backend_url } from '@/config';

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
  avatar?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  lastActive?: Date;
  _id?: string;
  phoneVerifiedDate: Date;
  emailVerifiedDate: Date;
}

// Temporary user data for signup flow
export interface TempUserData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  signupTimestamp: Date;
}

interface UserStore {
  users: User[];
  currentUser: User | null;
  tempUserData: TempUserData | null; // Store temp signup data
  
  // Basic CRUD Operations
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  getUserByEmail: (email: string) => User | undefined;
  getAllUsers: () => User[];
  
  // Authentication Operations
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  syncUserFromLocalStorage: () => void;
  
  // Signup Flow Operations
  setTempUserData: (userData: TempUserData) => void;
  getTempUserData: () => TempUserData | null;
  clearTempUserData: () => void;
  getTempUserEmail: () => string | null;
  
  // User Management
  verifyUserEmail: (email: string) => void;
  verifyUserPhone: (email: string) => void;
  updateUserLastActive: (email: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      tempUserData: null,
      
      // ========== CRUD Operations ==========
      
      // CREATE - Add a new user
      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          isEmailVerified: false,
          isPhoneVerified: false,
          lastActive: new Date(),
          phoneVerifiedDate: new Date(),
          emailVerifiedDate: new Date(),
        };
        
        set((state) => ({
          users: [...state.users, newUser],
        }));
        
        return newUser;
      },
      
      // READ - Get user by ID
      getUserById: (id: string) => {
        return get().users.find(user => user.id === id || user._id === id);
      },
      
      // READ - Get user by email
      getUserByEmail: (email: string) => {
        return get().users.find(user => user.email === email);
      },
      
      // READ - Get all users
      getAllUsers: () => {
        return get().users;
      },
      
      // UPDATE - Update user by ID
      updateUser: (id: string, updates: Partial<User>) => {
        set((state) => ({
          users: state.users.map(user => 
            (user.id === id || user._id === id) 
              ? { ...user, ...updates, lastActive: new Date() }
              : user
          )
        }));
        
        // If updating current user, update currentUser as well
        const currentUser = get().currentUser;
        if (currentUser && (currentUser.id === id || currentUser._id === id)) {
          set((state) => ({
            currentUser: { ...state.currentUser!, ...updates, lastActive: new Date() }
          }));
        }
      },
      
      // DELETE - Remove user by ID
      deleteUser: (id: string) => {
        set((state) => ({
          users: state.users.filter(user => user.id !== id && user._id !== id)
        }));
        
        // If deleting current user, logout
        const currentUser = get().currentUser;
        if (currentUser && (currentUser.id === id || currentUser._id === id)) {
          get().logout();
        }
      },
      
      // ========== Signup Flow Operations ==========
      
      // Store temporary signup data
      setTempUserData: (userData: TempUserData) => {
        set({ tempUserData: userData });
      },
      
      // Get temporary signup data
      getTempUserData: () => {
        return get().tempUserData;
      },
      
      // Get email from temp data (for email verification)
      getTempUserEmail: () => {
        const tempData = get().tempUserData;
        return tempData ? tempData.email : null;
      },
      
      // Clear temporary data after successful verification
      clearTempUserData: () => {
        set({ tempUserData: null });
      },
      
      // ========== User Management Operations ==========
      
      // Mark user's email as verified
      verifyUserEmail: (email: string) => {
        set((state) => ({
          users: state.users.map(user => 
            user.email === email 
              ? { ...user, isEmailVerified: true, emailVerifiedDate: new Date() }
              : user
          )
        }));
        
        // Update current user if it's the same email
        if (get().currentUser?.email === email) {
          set((state) => ({
            currentUser: { 
              ...state.currentUser!, 
              isEmailVerified: true, 
              emailVerifiedDate: new Date() 
            }
          }));
        }
      },
      
      // Mark user's phone as verified
      verifyUserPhone: (email: string) => {
        set((state) => ({
          users: state.users.map(user => 
            user.email === email 
              ? { ...user, isPhoneVerified: true, phoneVerifiedDate: new Date() }
              : user
          )
        }));
      },
      
      // Update user's last active time
      updateUserLastActive: (email: string) => {
        set((state) => ({
          users: state.users.map(user => 
            user.email === email 
              ? { ...user, lastActive: new Date() }
              : user
          )
        }));
      },
      
      // ========== Authentication Operations ==========
      
      login: async (email, password) => {
        try {
          const response = await fetch(`${backend_url}/auth/login`, {
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
          const normalizeUserData = (userData: Partial<User>): User => {
            return {
              id: userData.id || userData._id || Math.random().toString(36).substr(2, 9),
              firstName: userData.firstName || 'User',
              lastName: userData.lastName || '',
              username: userData.username || userData.email?.split('@')[0] || 'user',
              email: userData.email || '',
              password: userData.password || '',
              role: userData.role || 'QA Tester',
              createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
              phone: userData.phone || '',
              location: userData.location || '',
              bio: userData.bio || '',
              company: userData.company || '',
              profileImage: userData.profileImage || userData.avatar || '',
              isEmailVerified: userData.isEmailVerified || false,
              isPhoneVerified: userData.isPhoneVerified || false,
              lastActive: userData.lastActive ? new Date(userData.lastActive) : new Date(),
              phoneVerifiedDate: userData.phoneVerifiedDate ? new Date(userData.phoneVerifiedDate) : new Date(),
              emailVerifiedDate: userData.emailVerifiedDate ? new Date(userData.emailVerifiedDate) : new Date(),
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
              
              // Update user in store if exists, otherwise add
              const existingUser = get().getUserByEmail(userData.email);
              if (existingUser) {
                get().updateUser(existingUser.id, userData);
              } else {
                get().addUser(userData);
              }
            }
            
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
          
          // Update in users array as well
          const userId = state.currentUser.id || state.currentUser._id;
          if (userId) {
            get().updateUser(userId, updates);
          }
          
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
      
    }),
    {
      name: 'user-storage',
      // Only persist users and currentUser, not tempUserData
      partialize: (state) => ({ 
        users: state.users, 
        currentUser: state.currentUser 
      }),
    }
  )
);