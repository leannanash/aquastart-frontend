import axios, { AxiosError } from 'axios'
import type { ApiErrorShape } from '@/types/common'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

// Attach the Sanctum bearer token, if we have one, to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function normalizeApiError(error: unknown): ApiErrorShape {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>
    return {
      message: err.response?.data?.message ?? 'Something went wrong. Please try again.',
      errors: err.response?.data?.errors,
      status: err.response?.status,
    }
  }
  return { message: 'Something went wrong. Please try again.' }
}
