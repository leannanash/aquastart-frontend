import type { Lesson } from '@/types/lesson'
import type { Schedule } from '@/types/schedule'
import type { BookingCustomerInfo } from '@/types/booking'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'

interface Props {
  lesson: Lesson
  schedule: Schedule
  customerInfo: BookingCustomerInfo
  isSubmitting: boolean
  error: string | null
  onConfirm: () => void
  onBack: () => void
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-water-100 py-3 text-sm last:border-0">
      <span className="text-ink/50">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  )
}

export function Summary({ lesson, schedule, customerInfo, isSubmitting, error, onConfirm, onBack }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-ink">Step 5 — Review your booking</h2>
      <Card className="p-6">
        <Row label="Lesson" value={lesson.name} />
        <Row label="Instructor" value={schedule.instructor?.name ?? 'Assigned by school'} />
        <Row label="Date" value={formatDate(schedule.date)} />
        <Row label="Time" value={`${formatTime(schedule.start_time)} – ${formatTime(schedule.end_time)}`} />
        <Row label="Name" value={customerInfo.full_name} />
        <Row label="Email" value={customerInfo.email} />
        <Row label="Phone" value={customerInfo.phone} />
        <Row label="Age" value={String(customerInfo.age)} />
        <div className="flex items-center justify-between pt-4">
          <span className="font-semibold text-ink">Total</span>
          <span className="font-display text-xl font-semibold text-water-700">
            {formatCurrency(lesson.price)}
          </span>
        </div>
      </Card>

      <p className="mt-4 text-sm text-ink/50">
        Your booking will be marked <strong className="text-ink/70">Pending</strong> until the
        school confirms it. You'll receive an update at the email above.
      </p>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Button onClick={onConfirm} isLoading={isSubmitting}>
          Confirm booking
        </Button>
        <Button type="button" variant="ghost" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
      </div>
    </div>
  )
}
