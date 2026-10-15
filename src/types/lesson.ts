export type LessonLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Lesson {
  id: number
  name: string
  description: string
  price: number
  duration_minutes: number
  level: LessonLevel
  capacity: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}
