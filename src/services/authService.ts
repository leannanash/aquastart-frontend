import { api } from './api'
import type { LoginPayload, User } from '@/types/user'

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    const { data } = await api.post<{ user: User; token: string }>('/auth/login', payload)
    localStorage.setItem('auth_token', data.token)
    return data.user
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
    localStorage.removeItem('auth_token')
  },

  async me(): Promise<User | null> {
    try {
      const { data } = await api.get<{ data: User }>('/auth/me')
      return data.data
    } catch {
      return null
    }
  },
}
