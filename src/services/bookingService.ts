import { api, normalizeApiError } from './api'
import type { Booking, CreateBookingPayload } from '@/types/booking'
import { generateBookingReference } from '@/lib/utils'
import { mockLessons, mockInstructors, mockSchedules } from '@/data/mockData'

export const bookingService = {
  /**
   * Creates a booking. In production this hits POST /api/bookings, where
   * the Laravel backend re-validates availability/capacity inside a DB
   * transaction (see backend Phase 4/5 — never trust client-side checks
   * alone for this). Falls back to a locally-simulated booking so the
   * flow is demoable before the backend exists.
   */
  async create(payload: CreateBookingPayload): Promise<Booking> {
    try {
      const { data } = await api.post<{ data: Booking }>('/bookings', payload)
      return data.data
    } catch (error) {
      const normalized = normalizeApiError(error)
      // Only fall back to the simulated path when there's no backend to
      // talk to at all (network/setup error). A real validation error
      // (422, capacity full, etc.) should surface to the user.
      if (normalized.status) {
        throw normalized
      }

      const lesson = mockLessons.find((l) => l.id === payload.lesson_id)
      const schedule = mockSchedules.find((s) => s.id === payload.schedule_id)
      const instructor = mockInstructors.find((i) => i.id === schedule?.instructor_id)

      return {
        id: Math.floor(Math.random() * 100000),
        reference: generateBookingReference(),
        status: 'Pending',
        full_name: payload.full_name,
        email: payload.email,
        phone: payload.phone,
        age: Number(payload.age) || 0,
        notes: payload.notes || null,
        lesson_id: payload.lesson_id,
        schedule_id: payload.schedule_id,
        price: lesson?.price ?? 0,
        lesson_name: lesson?.name,
        instructor_name: instructor?.name,
        date: schedule?.date,
        start_time: schedule?.start_time,
        end_time: schedule?.end_time,
        created_at: new Date().toISOString(),
      }
    }
  },
}
