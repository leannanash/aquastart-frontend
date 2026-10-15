import type { Lesson } from './lesson'
import type { Instructor } from './instructor'

export type ScheduleStatus = 'Available' | 'Full' | 'Cancelled'

export interface Schedule {
  id: number
  lesson_id: number
  instructor_id: number
  date: string
  start_time: string
  end_time: string
  capacity: number
  spots_taken?: number
  status: ScheduleStatus
  lesson?: Lesson
  instructor?: Instructor
}
