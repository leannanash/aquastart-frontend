/**
 * DEV-ONLY FALLBACK DATA.
 *
 * The real app is meant to source all of this from the Laravel API
 * (see src/services/*). This file exists purely so the frontend is
 * demoable before the backend (Phase 2+) is built. Every service
 * function tries the API first and only falls back to this data if
 * the request fails — once VITE_API_URL points at a live backend,
 * this file stops being used. Do not import it directly from
 * components or pages.
 */
import type { Lesson } from '@/types/lesson'
import type { Instructor } from '@/types/instructor'
import type { Schedule } from '@/types/schedule'

export const mockLessons: Lesson[] = [
  {
    id: 1,
    name: 'Beginner Swimming',
    description:
      'For first-time swimmers of any age. Water comfort, floating, breathing, and the basics of front and back movement in a calm, shallow-water setting.',
    price: 35,
    duration_minutes: 45,
    level: 'Beginner',
    capacity: 6,
    is_active: true,
  },
  {
    id: 2,
    name: 'Intermediate Swimming',
    description:
      'For swimmers who can float and glide independently. Focus on stroke technique, breath control, and building endurance across the pool.',
    price: 40,
    duration_minutes: 45,
    level: 'Intermediate',
    capacity: 6,
    is_active: true,
  },
  {
    id: 3,
    name: 'Advanced Swimming',
    description:
      'For confident swimmers refining technique. Stroke efficiency, turns, and endurance work for freestyle, backstroke, and breaststroke.',
    price: 45,
    duration_minutes: 60,
    level: 'Advanced',
    capacity: 4,
    is_active: true,
  },
  {
    id: 4,
    name: 'Adult Learn-to-Swim',
    description:
      'A patient, judgment-free class for adults building water confidence from scratch, at their own pace.',
    price: 45,
    duration_minutes: 45,
    level: 'Beginner',
    capacity: 4,
    is_active: true,
  },
]

export const mockInstructors: Instructor[] = [
  {
    id: 1,
    name: 'Maria Santos',
    bio: 'Certified swim instructor with 9 years of experience teaching beginners and young children to build water confidence.',
    photo: null,
    specialization: 'Beginner & Children',
    is_active: true,
  },
  {
    id: 2,
    name: 'James Cruz',
    bio: 'Former competitive swimmer specializing in stroke technique and endurance training for intermediate and advanced swimmers.',
    photo: null,
    specialization: 'Stroke Technique',
    is_active: true,
  },
  {
    id: 3,
    name: 'Liza Fernandez',
    bio: 'Water Safety Instructor focused on adult learners and anxious beginners, with a calm, step-by-step teaching style.',
    photo: null,
    specialization: 'Adult Learners',
    is_active: true,
  },
]

function isoDateInDays(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export const mockSchedules: Schedule[] = [
  { id: 1, lesson_id: 1, instructor_id: 1, date: isoDateInDays(1), start_time: '09:00', end_time: '09:45', capacity: 6, spots_taken: 2, status: 'Available' },
  { id: 2, lesson_id: 1, instructor_id: 1, date: isoDateInDays(1), start_time: '10:00', end_time: '10:45', capacity: 6, spots_taken: 6, status: 'Full' },
  { id: 3, lesson_id: 2, instructor_id: 2, date: isoDateInDays(2), start_time: '16:00', end_time: '16:45', capacity: 6, spots_taken: 3, status: 'Available' },
  { id: 4, lesson_id: 3, instructor_id: 2, date: isoDateInDays(3), start_time: '17:00', end_time: '18:00', capacity: 4, spots_taken: 1, status: 'Available' },
  { id: 5, lesson_id: 4, instructor_id: 3, date: isoDateInDays(4), start_time: '18:00', end_time: '18:45', capacity: 4, spots_taken: 0, status: 'Available' },
  { id: 6, lesson_id: 1, instructor_id: 1, date: isoDateInDays(5), start_time: '09:00', end_time: '09:45', capacity: 6, spots_taken: 4, status: 'Available' },
  { id: 7, lesson_id: 2, instructor_id: 2, date: isoDateInDays(6), start_time: '16:00', end_time: '16:45', capacity: 6, spots_taken: 0, status: 'Cancelled' },
  { id: 8, lesson_id: 3, instructor_id: 2, date: isoDateInDays(7), start_time: '17:00', end_time: '18:00', capacity: 4, spots_taken: 2, status: 'Available' },
]

export const mockTestimonials = [
  {
    id: 1,
    name: 'Andrea L.',
    quote:
      'My daughter went from scared of the water to swimming full laps in one term. Maria was endlessly patient with her.',
    context: 'Parent of a Beginner student',
  },
  {
    id: 2,
    name: 'Ronald T.',
    quote:
      'I learned to swim at 34. Never thought I would, but the adult class made it feel completely normal to start from zero.',
    context: 'Adult Learn-to-Swim graduate',
  },
  {
    id: 3,
    name: 'Kim P.',
    quote:
      'James rebuilt my freestyle technique in a few sessions. I shaved real time off my laps once the form clicked.',
    context: 'Advanced student',
  },
]
