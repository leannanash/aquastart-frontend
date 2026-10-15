import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: ReactNode
}

export function SectionHeading({ title, description, align = 'left', action }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start justify-between sm:flex-row sm:items-end',
      )}
    >
      <div className={cn(align === 'center' && 'max-w-xl')}>
        <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-prose text-ink/65">{description}</p>}
      </div>
      {action}
    </div>
  )
}
