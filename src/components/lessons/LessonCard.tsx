import { Link } from 'react-router-dom'
import { Clock, Users } from 'lucide-react'
import type { Lesson } from '@/types/lesson'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDuration } from '@/lib/utils'

const levelTone: Record<Lesson['level'], 'water' | 'aqua' | 'sun'> = {
  Beginner: 'aqua',
  Intermediate: 'water',
  Advanced: 'sun',
}

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">{lesson.name}</h3>
        <Badge tone={levelTone[lesson.level]}>{lesson.level}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-ink/65">{lesson.description}</p>
      <div className="flex items-center gap-4 text-sm text-ink/55">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {formatDuration(lesson.duration_minutes)}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" /> Up to {lesson.capacity}
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-water-100 pt-4">
        <span className="font-display text-xl font-semibold text-water-700">
          {formatCurrency(lesson.price)}
          <span className="ml-1 text-sm font-normal text-ink/50">/ lesson</span>
        </span>
        <Link
          to={`/book?lesson=${lesson.id}`}
          className="rounded-full bg-water-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-water-700"
        >
          Book now
        </Link>
      </div>
    </Card>
  )
}
