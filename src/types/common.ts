export interface ApiErrorShape {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'
