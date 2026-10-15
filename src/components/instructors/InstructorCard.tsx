import { UserRound } from 'lucide-react'
import type { Instructor } from '@/types/instructor'
import { Card } from '@/components/ui/Card'

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <Card className="flex flex-col items-center gap-4 p-6 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-water-50 text-water-400">
        {instructor.photo ? (
          <img src={instructor.photo} alt={instructor.name} className="h-full w-full rounded-full object-cover" />
        ) : (
          <UserRound className="h-10 w-10" aria-hidden />
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold text-ink">{instructor.name}</h3>
        <p className="text-xs font-medium uppercase tracking-wide text-aqua-600">
          {instructor.specialization}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-ink/65">{instructor.bio}</p>
    </Card>
  )
}
