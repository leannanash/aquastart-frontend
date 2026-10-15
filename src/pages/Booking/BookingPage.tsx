import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StepIndicator } from '@/components/booking/StepIndicator'
import { usePageView } from '@/hooks/useApi'
import { analyticsService } from '@/services/analyticsService'
import { lessonService } from '@/services/lessonService'
import { scheduleService } from '@/services/scheduleService'
import { bookingService } from '@/services/bookingService'
import type { Lesson } from '@/types/lesson'
import type { Schedule } from '@/types/schedule'
import type { Booking, BookingCustomerInfo } from '@/types/booking'
import { normalizeApiError } from '@/services/api'

import { SelectLesson } from './steps/SelectLesson'
import { SelectDate } from './steps/SelectDate'
import { SelectTime } from './steps/SelectTime'
import { CustomerInfoStep } from './steps/CustomerInfo'
import { Summary } from './steps/Summary'
import { Confirmation } from './steps/Confirmation'

const emptyCustomerInfo: BookingCustomerInfo = {
  full_name: '',
  email: '',
  phone: '',
  age: '',
  notes: '',
}

export default function BookingPage() {
  usePageView('/book')

  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [customerInfo, setCustomerInfo] = useState<BookingCustomerInfo>(emptyCustomerInfo)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    Promise.all([lessonService.list(), scheduleService.listAvailable()]).then(([l, s]) => {
      setLessons(l)
      setSchedules(s)
      setLoading(false)

      const lessonParam = searchParams.get('lesson')
      const scheduleParam = searchParams.get('schedule')
      if (lessonParam) {
        const found = l.find((x) => x.id === Number(lessonParam))
        if (found) setSelectedLesson(found)
      }
      if (scheduleParam) {
        const found = s.find((x) => x.id === Number(scheduleParam))
        if (found) {
          setSelectedSchedule(found)
          setSelectedDate(found.date)
          if (!lessonParam) {
            const lessonForSchedule = l.find((x) => x.id === found.lesson_id)
            if (lessonForSchedule) setSelectedLesson(lessonForSchedule)
          }
        }
      }
    })
    analyticsService.track({ type: 'booking_page_visit', path: '/book' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const schedulesForLesson = useMemo(
    () => (selectedLesson ? schedules.filter((s) => s.lesson_id === selectedLesson.id) : []),
    [schedules, selectedLesson],
  )

  const availableDates = useMemo(
    () => Array.from(new Set(schedulesForLesson.map((s) => s.date))).sort(),
    [schedulesForLesson],
  )

  const schedulesForDate = useMemo(
    () => (selectedDate ? schedulesForLesson.filter((s) => s.date === selectedDate) : []),
    [schedulesForLesson, selectedDate],
  )

  function goTo(n: number) {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSelectLesson(lesson: Lesson) {
    setSelectedLesson(lesson)
    setSelectedDate(null)
    setSelectedSchedule(null)
    analyticsService.track({ type: 'booking_started', path: '/book', meta: { lesson_id: lesson.id } })
    goTo(2)
  }

  function handleSelectDate(date: string) {
    setSelectedDate(date)
    setSelectedSchedule(null)
    goTo(3)
  }

  function handleSelectTime(schedule: Schedule) {
    setSelectedSchedule(schedule)
    goTo(4)
  }

  function handleCustomerInfoSubmit(info: BookingCustomerInfo) {
    setCustomerInfo(info)
    goTo(5)
  }

  async function handleConfirm() {
    if (!selectedLesson || !selectedSchedule) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const booking = await bookingService.create({
        lesson_id: selectedLesson.id,
        schedule_id: selectedSchedule.id,
        ...customerInfo,
      })
      analyticsService.track({ type: 'booking_completed', path: '/book', meta: { reference: booking.reference } })
      setConfirmedBooking(booking)
      goTo(6)
    } catch (err) {
      setSubmitError(normalizeApiError(err).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Book a lesson</h1>
        <p className="mt-2 text-ink/60">Six quick steps and you're on the schedule.</p>

        {step <= 5 && (
          <div className="mt-8 overflow-x-auto pb-2">
            <StepIndicator current={step} />
          </div>
        )}

        <div className="mt-8">
          {step === 1 && (
            <SelectLesson
              lessons={lessons}
              loading={loading}
              selected={selectedLesson}
              onSelect={handleSelectLesson}
            />
          )}
          {step === 2 && selectedLesson && (
            <SelectDate
              lesson={selectedLesson}
              availableDates={availableDates}
              onSelect={handleSelectDate}
              onBack={() => goTo(1)}
            />
          )}
          {step === 3 && selectedLesson && selectedDate && (
            <SelectTime
              lesson={selectedLesson}
              date={selectedDate}
              schedules={schedulesForDate}
              onSelect={handleSelectTime}
              onBack={() => goTo(2)}
            />
          )}
          {step === 4 && (
            <CustomerInfoStep
              initial={customerInfo}
              onSubmit={handleCustomerInfoSubmit}
              onBack={() => goTo(3)}
            />
          )}
          {step === 5 && selectedLesson && selectedSchedule && (
            <Summary
              lesson={selectedLesson}
              schedule={selectedSchedule}
              customerInfo={customerInfo}
              isSubmitting={isSubmitting}
              error={submitError}
              onConfirm={handleConfirm}
              onBack={() => goTo(4)}
            />
          )}
          {step === 6 && confirmedBooking && <Confirmation booking={confirmedBooking} />}
        </div>
      </div>
    </div>
  )
}
