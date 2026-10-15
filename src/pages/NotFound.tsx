import { Link } from 'react-router-dom'
import { Waves } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <Waves className="h-10 w-10 text-water-400" aria-hidden />
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-sm text-ink/60">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  )
}
