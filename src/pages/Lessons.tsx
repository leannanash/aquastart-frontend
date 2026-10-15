import { useMemo, useState } from 'react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { LessonCard } from '@/components/lessons/LessonCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { EmptyState } from '@/components/ui/EmptyState'
import { useApi, usePageView } from '@/hooks/useApi'
import { lessonService } from '@/services/lessonService'
import type { LessonLevel } from '@/types/lesson'
import { cn } from '@/lib/utils'
import { Waves } from 'lucide-react'

const filters: Array<LessonLevel | 'All'> = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function Lessons() {
  usePageView('/lessons')
  const { data, isLoading, status, error } = useApi(() => lessonService.list(), [])
  const [filter, setFilter] = useState<LessonLevel | 'All'>('All')

  const filtered = useMemo(() => {
    if (!data) return []
    return filter === 'All' ? data : data.filter((l) => l.level === filter)
  }, [data, filter])

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading
        title="Swimming lessons"
        description="Every program builds on the last, so swimmers always know what's next."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              filter === f ? 'bg-water-600 text-white' : 'bg-white text-ink/60 hover:text-ink',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSpinner label="Loading lessons…" />}
      {status === 'error' && <ErrorMessage message={error ?? 'Something went wrong.'} />}
      {data && filtered.length === 0 && (
        <EmptyState
          icon={<Waves className="h-8 w-8" />}
          title="No lessons at this level yet"
          description="Try a different level, or check back soon."
        />
      )}
      {data && filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  )
}
