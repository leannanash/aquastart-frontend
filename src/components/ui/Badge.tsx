import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'water' | 'aqua' | 'sun' | 'neutral' | 'red'

const toneClasses: Record<Tone, string> = {
  water: 'bg-water-50 text-water-700',
  aqua: 'bg-aqua-400/15 text-aqua-600',
  sun: 'bg-sun-400/20 text-sun-600',
  neutral: 'bg-ink-50 text-ink/70',
  red: 'bg-red-50 text-red-600',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ tone = 'water', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
