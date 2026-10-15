import { Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { mockTestimonials } from '@/data/mockData'

export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {mockTestimonials.map((t) => (
        <Card key={t.id} className="flex flex-col gap-4 p-6">
          <Quote className="h-6 w-6 text-sun-500" aria-hidden />
          <p className="text-sm leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
          <div className="mt-auto">
            <p className="text-sm font-semibold text-ink">{t.name}</p>
            <p className="text-xs text-ink/50">{t.context}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
