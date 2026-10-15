import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl border border-water-100 bg-white shadow-card', className)}
      {...props}
    >
      {children}
    </div>
  )
}
