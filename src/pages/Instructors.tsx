import { SectionHeading } from '@/components/shared/SectionHeading'
import { InstructorCard } from '@/components/instructors/InstructorCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useApi, usePageView } from '@/hooks/useApi'
import { instructorService } from '@/services/instructorService'

export default function Instructors() {
  usePageView('/instructors')

  const { data, isLoading, status, error } = useApi(
    () => instructorService.list(),
    [],
  )

  return (
    <main className="container-page py-16 sm:py-20">
      <SectionHeading
        title="Meet Your Swimming Coach"
        description="Personalized swimming lessons led by an experienced instructor who helps swimmers build confidence, improve technique, and develop essential water safety skills."
      />

      {isLoading && <LoadingSpinner label="Loading coach profile…" />}

      {status === 'error' && (
        <ErrorMessage message={error ?? 'Unable to load the coach profile.'} />
      )}

      {data && data.length > 0 && (
        <section className="mx-auto mt-10 max-w-6xl">
          {data.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
            />
          ))}
        </section>
      )}

      {data && data.length === 0 && !isLoading && (
        <p className="py-12 text-center text-gray-500">
          Our coach profile is being prepared. Please check back soon.
        </p>
      )}
    </main>
  )
}