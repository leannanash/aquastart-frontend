import type { Lesson } from '@/types/lesson'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'

interface Props {
  lesson: Lesson
  availableDates: string[]
  onSelect: (date: string) => void
  onBack: () => void
}

export function SelectDate({ lesson, availableDates, onSelect, onBack }: Props) {
  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-ink">Step 2 — Choose a date</h2>
      <p className="mb-4 text-sm text-ink/50">Showing available dates for {lesson.name}.</p>

      {availableDates.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8" />}
          title="No open dates for this lesson"
          description="Try a different lesson, or check back soon for new schedules."
          action={
            <Button variant="ghost" onClick={onBack}>
              Choose a different lesson
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {availableDates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => onSelect(date)}
                className="rounded-xl border border-water-100 bg-white px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:border-water-600 hover:bg-water-50"
              >
                {formatDate(date)}
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
