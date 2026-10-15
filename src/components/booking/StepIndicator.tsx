import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = ['Lesson', 'Date', 'Time', 'Your info', 'Summary']

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isDone = stepNum < current
        const isActive = stepNum === current
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                isDone && 'bg-aqua-500 text-white',
                isActive && 'bg-water-600 text-white',
                !isDone && !isActive && 'bg-water-50 text-ink/40',
              )}
            >
              {isDone ? <Check className="h-3.5 w-3.5" /> : stepNum}
            </span>
            <span className={cn('text-sm', isActive ? 'font-semibold text-ink' : 'text-ink/50')}>
              {label}
            </span>
            {stepNum < steps.length && <span className="mx-1 h-px w-6 bg-water-100 sm:w-10" />}
          </li>
        )
      })}
    </ol>
  )
}
