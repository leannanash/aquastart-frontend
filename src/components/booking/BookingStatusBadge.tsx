import type { BookingStatus } from '@/types/booking'
import { Badge } from '@/components/ui/Badge'

const statusTone: Record<BookingStatus, 'water' | 'aqua' | 'sun' | 'neutral' | 'red'> = {
  Pending: 'sun',
  Confirmed: 'aqua',
  Completed: 'water',
  Cancelled: 'red',
  'No-show': 'neutral',
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={statusTone[status]}>{status}</Badge>
}
