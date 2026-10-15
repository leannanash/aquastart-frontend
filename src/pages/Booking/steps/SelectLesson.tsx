import type { Lesson } from '@/types/lesson'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { Waves } from 'lucide-react'
import { cn } from '@/lib/utils'

const levelTone: Record<Lesson['level'], 'water' | 'aqua' | 'sun'> = {
  Beginner: 'aqua',
  Intermediate: 'water',
  Advanced: 'sun',
}

interface Props {
  lessons: Lesson[]
  loading: boolean
  selected: Lesson | null
  onSelect: (lesson: Lesson) => void
}

export function SelectLesson({ lessons, loading, selected, onSelect }: Props) {
  if (loading) return <LoadingSpinner label="Loading lessons…" />
  if (lessons.length === 0) {
    return <EmptyState icon={<Waves className="h-8 w-8" />} title="No lessons available to book right now" />
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-ink">Step 1 — Choose a swimming lesson</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <button key={lesson.id} type="button" onClick={() => onSelect(lesson)} className="text-left">
            <Card
              className={cn(
                'flex h-full flex-col gap-3 p-5 transition-colors',
                selected?.id === lesson.id ? 'border-water-600 ring-1 ring-water-600' : 'hover:border-water-300',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-ink">{lesson.name}</h3>
                <Badge tone={levelTone[lesson.level]}>{lesson.level}</Badge>
              </div>
              <p className="text-sm text-ink/60">{lesson.description}</p>
              <div className="mt-auto flex items-center justify-between pt-2 text-sm">
                <span className="text-ink/50">{formatDuration(lesson.duration_minutes)}</span>
                <span className="font-semibold text-water-700">{formatCurrency(lesson.price)}</span>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
