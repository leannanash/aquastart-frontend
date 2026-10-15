import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'rounded-xl border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40',
            'focus:outline-none focus:ring-2 focus:ring-water-400',
            error ? 'border-red-300' : 'border-water-100',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-600">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-ink/50">
            {hint}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
