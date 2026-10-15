import {
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Waves,
} from 'lucide-react'
import type { Instructor } from '@/types/instructor'
import { Card } from '@/components/ui/Card'

const teachingExperience = [
  {
    organization: 'Lake City Swim Club',
    location: 'San Pablo City',
    period: 'Summers of 2016, 2017 & 2019',
  },
  {
    organization: 'Richwood Learn to Swim',
    location: 'San Pablo City',
    period: 'May–June 2022',
  },
  {
    organization: 'Valle Verde Country Club',
    location: 'Pasig City',
    period: 'April–June 2023',
  },
  {
    organization: 'CL Giant Otters Swim School',
    location: 'BF Resort, Las Piñas',
    period: 'June–August 2023',
  },
  {
    organization: 'University of Perpetual Help System DALTA',
    location: 'Las Piñas Campus',
    period: 'July–August 2023; May–August 2024',
  },
]

const achievements = [
  'Multi-medalist in the 2013 Speedo G League Series (Class B)',
  '4th Speedo Nationals G League Nationals Qualifier',
  'Multi-medalist in STASA competitions from 2014 to 2018',
  'STASA Championship Qualifier',
  'University varsity swimming athlete from 2018 to 2024, excluding the pandemic period',
  '4 × 100 m freestyle relay bronze medalist in Seasons 95 and 98',
]

export function InstructorCard({
  instructor,
}: {
  instructor: Instructor
}) {
  return (
    <article className="space-y-6">
      {/* Coach introduction */}
      <Card className="overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          {/* Portrait */}
          <div className="relative min-h-[300px] bg-water-50 md:min-h-[460px]">
            {instructor.photo ? (
              <img
                src={instructor.photo}
                alt={`${instructor.name}, swimming instructor`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-water-500">
                <Waves className="h-16 w-16" aria-hidden />
                <p className="text-sm font-medium">
                  Instructor photo coming soon
                </p>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-16">
              <p className="text-sm font-medium text-white/80">
                YOUR AQUASTART COACH
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                {instructor.name}
              </h2>
            </div>
          </div>

          {/* Introduction */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua-600">
              Meet your swimming coach
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Build confidence in the water.
            </h3>

            <p className="mt-4 text-sm leading-7 text-ink/70">
              {instructor.bio}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-water-50 px-3 py-2 text-xs font-semibold text-water-700">
                Swimming Technique
              </span>
              <span className="rounded-full bg-water-50 px-3 py-2 text-xs font-semibold text-water-700">
                Water Safety
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 border-t border-ink/10 pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-water-50 p-2 text-water-600">
                  <Award className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Competitive background
                  </p>
                  <p className="mt-1 text-xs leading-5 text-ink/60">
                    Former university varsity swimmer and competition medalist.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-water-50 p-2 text-water-600">
                  <ShieldCheck className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Water safety training
                  </p>
                  <p className="mt-1 text-xs leading-5 text-ink/60">
                    Basic First Aid and Water Safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Credentials */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Teaching history */}
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-water-50 p-2.5 text-water-600">
              <BriefcaseBusiness className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="font-bold text-ink">Teaching Experience</h3>
          </div>

          <ol className="space-y-5 border-l-2 border-water-100 pl-4">
            {teachingExperience.map((item) => (
              <li key={item.organization} className="relative">
                <span
                  className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-aqua-500 ring-1 ring-water-100"
                  aria-hidden
                />
                <h4 className="text-sm font-semibold leading-5 text-ink">
                  {item.organization}
                </h4>
                <p className="mt-1 text-xs leading-5 text-ink/60">
                  {item.location}
                </p>
                <p className="text-xs leading-5 text-ink/60">
                  {item.period}
                </p>
              </li>
            ))}
          </ol>
        </Card>

        {/* Achievements */}
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-water-50 p-2.5 text-water-600">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="font-bold text-ink">Achievements</h3>
          </div>

          <ul className="space-y-4">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-aqua-600"
                  aria-hidden
                />
                <span className="text-sm leading-6 text-ink/70">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Certifications */}
        <Card className="flex flex-col p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-water-50 p-2.5 text-water-600">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="font-bold text-ink">Certification</h3>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-water-50/70 p-4">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-aqua-600"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-ink">
                Basic First Aid and Water Safety
              </p>
              <p className="mt-1 text-xs leading-5 text-ink/60">
                Training in essential first aid and water safety.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-water-100 p-4">
            <p className="text-sm font-semibold text-ink">
              Ready to get started?
            </p>
            <p className="mt-1 text-xs leading-5 text-ink/60">
              Find a swimming lesson that suits your skill level.
            </p>
            <a
              href="/lessons"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-aqua-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-aqua-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-600"
            >
              Explore Lessons
            </a>
          </div>
        </Card>
      </div>
    </article>
  )
}