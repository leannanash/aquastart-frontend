import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LoadingSpinner({ label = 'Loading…', className }: { label?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-water-600', className)}>
      <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
      <p className="text-sm text-ink/60">{label}</p>
    </div>
  )
}
