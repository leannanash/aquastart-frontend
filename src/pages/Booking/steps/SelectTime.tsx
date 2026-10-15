import type { Lesson } from '@/types/lesson'
import type { Schedule } from '@/types/schedule'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate, formatTime } from '@/lib/utils'
import { Clock, User as UserIcon } from 'lucide-react'

interface Props {
  lesson: Lesson
  date: string
  schedules: Schedule[]
  onSelect: (schedule: Schedule) => void
  onBack: () => void
}

export function SelectTime({ lesson, date, schedules, onSelect, onBack }: Props) {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-ink">Step 3 — Choose a time</h2>
      <p className="mb-4 text-sm text-ink/50">
        {lesson.name} on {formatDate(date)}
      </p>

      {schedules.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-8 w-8" />}
          title="No time slots left on this date"
          action={
            <Button variant="ghost" onClick={onBack}>
              Choose a different date
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {schedules.map((s) => (
              <button key={s.id} type="button" onClick={() => onSelect(s)} className="text-left">
                <Card className="flex items-center justify-between gap-3 p-4 transition-colors hover:border-water-300">
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold text-ink">
                      <Clock className="h-4 w-4 text-water-500" />
                      {formatTime(s.start_time)} – {formatTime(s.end_time)}
                    </p>
                    {s.instructor && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/50">
                        <UserIcon className="h-3.5 w-3.5" /> {s.instructor.name}
                      </p>
                    )}
                  </div>
                  {typeof s.spots_taken === 'number' && (
                    <span className="text-xs font-medium text-ink/40">
                      {s.capacity - s.spots_taken} spot{s.capacity - s.spots_taken === 1 ? '' : 's'} left
                    </span>
                  )}
                </Card>
              </button>
            ))}
          </div>
          <Button variant="ghost" className="mt-6" onClick={onBack}>
            Back
          </Button>
        </>
      )}
    </div>
  )
}
