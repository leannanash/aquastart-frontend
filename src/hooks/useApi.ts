import { useEffect, useRef, useState } from 'react'
import type { AsyncStatus } from '@/types/common'

/**
 * Generic data-fetching hook. Runs `fetcher` once on mount (and whenever
 * `deps` change), tracking loading/error/data state so pages don't each
 * re-implement the same three states.
 */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('loading')
  const [error, setError] = useState<string | null>(null)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setError(null)

    fetcherRef.current()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, status, error, isLoading: status === 'loading' }
}

/** Fires an analytics page-view event once per mounted page. */
export function usePageView(path: string) {
  useEffect(() => {
    import('@/services/analyticsService').then(({ analyticsService }) => {
      analyticsService.track({ type: 'page_view', path })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])
}
