import { Calendar, Clock, User as UserIcon } from 'lucide-react'
import type { Booking } from '@/types/booking'
import { Card } from '@/components/ui/Card'
import { BookingStatusBadge } from './BookingStatusBadge'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            {booking.reference}
          </p>
          <h3 className="text-base font-semibold text-ink">{booking.lesson_name}</h3>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/60">
        {booking.date && (
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {formatDate(booking.date)}
          </span>
        )}
        {booking.start_time && (
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {formatTime(booking.start_time)}
          </span>
        )}
        {booking.instructor_name && (
          <span className="flex items-center gap-1.5">
            <UserIcon className="h-4 w-4" /> {booking.instructor_name}
          </span>
        )}
      </div>
      <p className="text-sm font-semibold text-water-700">{formatCurrency(booking.price)}</p>
    </Card>
  )
}
