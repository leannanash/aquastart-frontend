import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Trophy } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { instructorService } from '@/services/instructorService'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function InstructorPreview() {
  const { data, isLoading } = useApi(
    () => instructorService.list(),
    [],
  )

  const instructor = data?.[0]

  if (isLoading) {
    return (
      <section className="container-page py-16">
        <LoadingSpinner label="Loading coach profile…" />
      </section>
    )
  }

  if (!instructor) return null

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-water-50">
            {instructor.photo ? (
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-water-500">
                <span className="text-sm">Coach photo coming soon</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aqua-600">
            Meet your coach
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {instructor.name}
          </h2>

          <p className="mt-3 text-lg font-medium text-aqua-700">
          Learn to swim with confidence.
         </p>

          <p className="mt-5 text-base leading-7 text-ink/70">
            {instructor.bio}
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Trophy className="mt-1 h-5 w-5 shrink-0 text-aqua-600" />
              <div>
                <h3 className="text-sm font-semibold text-ink">
                  Competitive swimming background
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink/65">
                  Former university varsity swimmer and multi-medalist in swimming competitions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-aqua-600" />
              <div>
                <h3 className="text-sm font-semibold text-ink">
                  Basic First Aid and Water Safety
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink/65">
                  Training in essential first aid and water safety.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/instructors"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-aqua-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-aqua-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600"
          >
            Meet Your Coach
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}