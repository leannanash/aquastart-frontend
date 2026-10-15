export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show'

export interface BookingCustomerInfo {
  full_name: string
  email: string
  phone: string
  age: number | ''
  notes: string
}

export interface CreateBookingPayload extends BookingCustomerInfo {
  lesson_id: number
  schedule_id: number
}

export interface Booking {
  id: number
  reference: string
  status: BookingStatus
  full_name: string
  email: string
  phone: string
  age: number
  notes: string | null
  lesson_id: number
  schedule_id: number
  price: number
  lesson_name?: string
  instructor_name?: string
  date?: string
  start_time?: string
  end_time?: string
  created_at: string
}
