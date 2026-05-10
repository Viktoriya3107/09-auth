import { create } from 'zustand'
import { User } from '@/types/user'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  clear: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clear: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))