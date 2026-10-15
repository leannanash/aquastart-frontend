import { api } from './api'
import type { AnalyticsEvent, AnalyticsSummary } from '@/types/analytics'

export const analyticsService = {
  /**
   * Fire-and-forget event tracking. Never throws — analytics should
   * never break the customer-facing experience if the endpoint is
   * unavailable during Phase 1-8 frontend work.
   */
  track(event: AnalyticsEvent): void {
    api.post('/analytics/events', event).catch(() => {
      /* swallow — analytics is best-effort */
    })
  },

  async summary(): Promise<AnalyticsSummary | null> {
    try {
      const { data } = await api.get<{ data: AnalyticsSummary }>('/admin/analytics')
      return data.data
    } catch {
      return null
    }
  },
}
