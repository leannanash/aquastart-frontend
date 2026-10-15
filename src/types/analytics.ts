export type AnalyticsEventType =
  | 'page_view'
  | 'lesson_page_view'
  | 'booking_page_visit'
  | 'booking_started'
  | 'booking_completed'

export interface AnalyticsEvent {
  type: AnalyticsEventType
  path: string
  meta?: Record<string, unknown>
}

export interface AnalyticsSummary {
  visitors: number
  page_views: number
  booking_page_visits: number
  booking_attempts: number
  completed_bookings: number
  conversion_rate: number
  most_viewed_lessons: { lesson_name: string; views: number }[]
  most_popular_times: { time: string; count: number }[]
  most_popular_days: { day: string; count: number }[]
}
