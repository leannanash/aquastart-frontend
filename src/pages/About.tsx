import { Link } from 'react-router-dom'
import { Award, HeartHandshake, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { usePageView } from '@/hooks/useApi'

const values = [
  { icon: HeartHandshake, title: 'Patience first', copy: 'Every swimmer learns at a different pace, and we never rush that process.' },
  { icon: Award, title: 'Certified instruction', copy: 'Every instructor is trained, certified, and background-checked before teaching.' },
  { icon: Sparkles, title: 'Real progress', copy: 'Clear, level-based curriculum so families can see how far their swimmer has come.' },
]

export default function About() {
  usePageView('/about')
  return (
    <div>
      <section className="bg-foam-50">
        <div className="container-page py-16 sm:py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-aqua-600">About AquaStart</p>
          <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
            Swimming is a life skill. We teach it like one.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/65">
            AquaStart began with a simple idea: swim lessons should be calm, structured, and
            genuinely enjoyable — for nervous beginners and competitive swimmers alike. Today our
            instructors teach students of every age, from first-time waders to swimmers polishing
            their racing turns.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title="What we care about" align="center" />
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-6 text-center">
              <v.icon className="mx-auto h-8 w-8 text-water-600" aria-hidden />
              <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{v.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-water-700">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="max-w-lg text-3xl font-semibold text-white">
            Come meet the team and see the pool
          </h2>
          <Link to="/instructors">
            <Button size="lg" variant="secondary">Meet our instructors</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
