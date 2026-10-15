import { AlertCircle } from 'lucide-react'

export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
      <AlertCircle className="h-6 w-6 text-red-500" aria-hidden />
      <p className="text-sm font-medium text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-semibold text-red-700 underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  )
}
