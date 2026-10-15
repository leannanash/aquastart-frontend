import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import type { Booking } from '@/types/booking'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-water-100 py-3 text-sm last:border-0">
      <span className="text-ink/50">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  )
}

export function Confirmation({ booking }: { booking: Booking }) {
  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-aqua-500" aria-hidden />
      <h2 className="mt-4 text-2xl font-semibold text-ink">Booking successful</h2>
      <p className="mt-2 text-ink/60">
        We've received your request. The school will confirm your booking shortly.
      </p>

      <Card className="mx-auto mt-8 max-w-md p-6 text-left">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-water-700">{booking.reference}</p>
          <BookingStatusBadge status={booking.status} />
        </div>
        <Row label="Customer" value={booking.full_name} />
        <Row label="Lesson" value={booking.lesson_name ?? '—'} />
        <Row label="Instructor" value={booking.instructor_name ?? 'Assigned by school'} />
        {booking.date && <Row label="Date" value={formatDate(booking.date)} />}
        {booking.start_time && <Row label="Time" value={formatTime(booking.start_time)} />}
        <Row label="Price" value={formatCurrency(booking.price)} />
      </Card>

      <Link to="/" className="mt-8 inline-block">
        <Button variant="ghost">Back to home</Button>
      </Link>
    </div>
  )
}
