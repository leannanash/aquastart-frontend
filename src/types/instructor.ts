export interface Instructor {
  id: number
  name: string
  bio: string
  photo: string | null
  specialization: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}
