/**
 * DEV-ONLY FALLBACK DATA.
 *
 * The real app sources data from the Laravel API (see src/services/*).
 * This file keeps the frontend demoable before the backend is available.
 * Each service tries the API first and falls back to this data on failure.
 * Do not import this file directly from components or pages.
 */
import type { Lesson } from '@/types/lesson'
import type { Instructor } from '@/types/instructor'
import type { Schedule } from '@/types/schedule'

export const mockLessons: Lesson[] = [
  {
    id: 1,
    name: 'Kids Swimming Program',
    description:
      'Swimming lessons for kids ages 8–16. Build water confidence, learn essential swimming skills, and improve technique through a structured 10-session program. Each session lasts 1 hour.',
    price: 5500,
    duration_minutes: 60,
    level: 'Beginner',
    capacity: 6,
    is_active: true,
  },
  {
    id: 2,
    name: 'Adult Swimming Program',
    description:
      'Swimming lessons for adults ages 17 and above. Develop water confidence, learn swimming fundamentals, and improve technique through a structured 10-session program. Each session lasts 1 hour.',
    price: 6000,
    duration_minutes: 60,
    level: 'Beginner',
    capacity: 6,
    is_active: true,
  },
]

export const mockInstructors: Instructor[] = [
  {
    id: 1,
    name: 'Kyle Hizon',
    bio:
      'An experienced swimming instructor and former university varsity swimmer who has taught at swim clubs, private swim schools, and a university program. Specializes in beginner swimming, stroke technique, and water safety.',
    photo: '/coach.jpg',
    specialization: 'Beginner Swimming, Stroke Technique & Water Safety',
    is_active: true,
  },
]

export const mockInstructorCredentials = {
  experience: [
    {
      organization: 'Lake City Swim Club',
      location: 'San Pablo City',
      period: 'Summers of 2016, 2017, and 2019',
      role: 'Swimming Instructor',
    },
    {
      organization: 'Richwood Learn to Swim',
      location: 'San Pablo City',
      period: 'May–June 2022',
      role: 'Swimming Instructor',
    },
    {
      organization: 'Valle Verde Country Club',
      location: 'Pasig City',
      period: 'April–June 2023',
      role: 'Swimming Instructor',
    },
    {
      organization: 'CL Giant Otters Swim School',
      location: 'BF Resort, Las Piñas',
      period: 'June–August 2023',
      role: 'Swimming Instructor',
    },
    {
      organization: 'University of Perpetual Help System DALTA',
      location: 'Las Piñas Campus',
      period: 'July–August 2023; May–August 2024',
      role: 'Swimming Instructor',
    },
  ],

  achievements: [
    'Multi-medalist in the 2013 Speedo G League Series (Class B)',
    '4th Speedo Nationals G League Nationals Qualifier',
    'Multi-medalist in STASA competitions from 2014 to 2018',
    'STASA Championship Qualifier',
    'University varsity swimming athlete from 2018 to 2024, excluding the pandemic period',
    '4 × 100 m freestyle relay bronze medalist in Seasons 95 and 98',
  ],

  certifications: ['Basic First Aid and Water Safety'],
}

export const mockProgramDetails = {
  sessions: 10,
  duration_minutes: 60,
  pricing: {
    adults: {
      age_min: 17,
      age_max: null,
      price: 6000,
    },
    kids: {
      age_min: 8,
      age_max: 16,
      price: 5500,
    },
  },
  contact_number: '09770059496',
  location: 'AAP Villa Resorts, ADB Subdivision, San Pablo, Laguna',
}

function isoDateInDays(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export const mockSchedules: Schedule[] = [
  {
    id: 1,
    lesson_id: 1,
    instructor_id: 1,
    date: isoDateInDays(1),
    start_time: '09:00',
    end_time: '10:00',
    capacity: 6,
    spots_taken: 2,
    status: 'Available',
  },
  {
    id: 2,
    lesson_id: 1,
    instructor_id: 1,
    date: isoDateInDays(1),
    start_time: '10:00',
    end_time: '11:00',
    capacity: 6,
    spots_taken: 6,
    status: 'Full',
  },
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
