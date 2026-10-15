import { api } from './api'
import type { Schedule } from '@/types/schedule'
import { mockSchedules, mockLessons, mockInstructors } from '@/data/mockData'
import { isPastDate } from '@/lib/utils'

function hydrateMock(schedules: Schedule[]): Schedule[] {
  return schedules.map((s) => ({
    ...s,
    lesson: mockLessons.find((l) => l.id === s.lesson_id),
    instructor: mockInstructors.find((i) => i.id === s.instructor_id),
  }))
}

export const scheduleService = {
  async listAvailable(lessonId?: number): Promise<Schedule[]> {
    try {
      const { data } = await api.get<{ data: Schedule[] }>('/schedules/available', {
        params: lessonId ? { lesson_id: lessonId } : undefined,
      })
      return data.data
    } catch {
      const available = hydrateMock(mockSchedules).filter(
        (s) => s.status === 'Available' && !isPastDate(s.date),
      )
      return lessonId ? available.filter((s) => s.lesson_id === lessonId) : available
    }
  },

  async list(): Promise<Schedule[]> {
    try {
      const { data } = await api.get<{ data: Schedule[] }>('/schedules')
      return data.data
    } catch {
      return hydrateMock(mockSchedules)
    }
  },
}
