import { api } from './api'
import type { Instructor } from '@/types/instructor'
import { mockInstructors } from '@/data/mockData'

export const instructorService = {
  async list(): Promise<Instructor[]> {
    try {
      const { data } = await api.get<{ data: Instructor[] }>('/instructors')
      return data.data
    } catch {
      return mockInstructors.filter((i) => i.is_active)
    }
  },
}
