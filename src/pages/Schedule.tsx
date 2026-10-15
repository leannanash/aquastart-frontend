import { useMemo, useState } from 'react'
import { CalendarDays, Clock, User as UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { EmptyState } from '@/components/ui/EmptyState'
import { useApi, usePageView } from '@/hooks/useApi'
import { scheduleService } from '@/services/scheduleService'
import { formatDate, formatTime } from '@/lib/utils'

export default function Schedule() {
  usePageView('/schedule')
  const { data, isLoading, status, error } = useApi(() => scheduleService.listAvailable(), [])

  const grouped = useMemo(() => {
    if (!data) return []
    const map = new Map<string, typeof data>()
    for (const s of data) {
      const list = map.get(s.date) ?? []
      list.push(s)
      map.set(s.date, list)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [data])

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading
        title="Upcoming schedule"
        description="Available time slots for the next couple of weeks. Booking a slot reserves your spot."
      />

      {isLoading && <LoadingSpinner label="Loading schedule…" />}
      {status === 'error' && <ErrorMessage message={error ?? 'Something went wrong.'} />}
      {data && grouped.length === 0 && (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8" />}
          title="No available slots right now"
          description="New time slots are added regularly — check back soon."
        />
      )}

      <div className="space-y-8">
        {grouped.map(([date, slots]) => (
          <div key={date}>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink/50">
              <CalendarDays className="h-4 w-4" /> {formatDate(date)}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map((s) => (
                <Card key={s.id} className="flex flex-col gap-3 p-5">
                  <p className="font-semibold text-ink">{s.lesson?.name}</p>
                  <div className="flex flex-col gap-1.5 text-sm text-ink/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {formatTime(s.start_time)} – {formatTime(s.end_time)}
                    </span>
                    {s.instructor && (
                      <span className="flex items-center gap-1.5">
                        <UserIcon className="h-4 w-4" /> {s.instructor.name}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/book?lesson=${s.lesson_id}&schedule=${s.id}`}
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-water-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-water-700"
                  >
                    Book this slot
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
