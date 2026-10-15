import { api } from './api'
import type { Lesson } from '@/types/lesson'
import { mockLessons } from '@/data/mockData'

export const lessonService = {
  async list(): Promise<Lesson[]> {
    try {
      const { data } = await api.get<{ data: Lesson[] }>('/lessons')
      return data.data
    } catch {
      // Backend not available yet (Phase 2+) — fall back to demo data.
      return mockLessons.filter((l) => l.is_active)
    }
  },

  async get(id: number): Promise<Lesson | undefined> {
    try {
      const { data } = await api.get<{ data: Lesson }>(`/lessons/${id}`)
      return data.data
    } catch {
      return mockLessons.find((l) => l.id === id)
    }
  },
}
