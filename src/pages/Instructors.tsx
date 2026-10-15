import { SectionHeading } from '@/components/shared/SectionHeading'
import { InstructorCard } from '@/components/instructors/InstructorCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useApi, usePageView } from '@/hooks/useApi'
import { instructorService } from '@/services/instructorService'

export default function Instructors() {
  usePageView('/instructors')
  const { data, isLoading, status, error } = useApi(() => instructorService.list(), [])

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading
        title="Our instructors"
        description="Certified, background-checked, and genuinely good with nervous first-timers."
      />
      {isLoading && <LoadingSpinner label="Loading instructors…" />}
      {status === 'error' && <ErrorMessage message={error ?? 'Something went wrong.'} />}
      {data && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((i) => (
            <InstructorCard key={i.id} instructor={i} />
          ))}
        </div>
      )}
    </div>
  )
}
