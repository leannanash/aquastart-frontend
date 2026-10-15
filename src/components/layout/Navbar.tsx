import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X} from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-water-100 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-water-700" onClick={() => setOpen(false)}>
          <img
            src="/aqua-start-logo.svg"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 object-contain"
          />          
        AquaStart
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-water-50 text-water-700' : 'text-ink/70 hover:text-water-700',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/book"
            className="inline-flex items-center rounded-full bg-water-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-water-700"
          >
            Book a Lesson
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-water-100 bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium',
                    isActive ? 'bg-water-50 text-water-700' : 'text-ink/70',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-water-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Book a Lesson
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
