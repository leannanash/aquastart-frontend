import { Link } from 'react-router-dom'
import { Waves, MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-water-100 bg-water-900 text-foam-50">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-white">
            <Waves className="h-6 w-6 text-aqua-400" aria-hidden />
            AquaStart
          </div>
          <p className="mt-3 max-w-xs text-sm text-foam-50/70">
            Swimming lessons for beginners, intermediate swimmers, and advanced students, taught
            by patient, certified instructors.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="AquaStart on Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="AquaStart on Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foam-50/50">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-foam-50/80">
            <li><Link to="/lessons" className="hover:text-white">Lessons</Link></li>
            <li><Link to="/instructors" className="hover:text-white">Instructors</Link></li>
            <li><Link to="/schedule" className="hover:text-white">Schedule</Link></li>
            <li><Link to="/book" className="hover:text-white">Book a Lesson</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foam-50/50">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-foam-50/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
              123 Poolside Avenue, Quezon City
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-aqua-400" />
              (02) 8123 4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-aqua-400" />
              hello@aquastart.example
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foam-50/50">Hours</h3>
          <ul className="mt-4 space-y-2 text-sm text-foam-50/80">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-aqua-400" />
              Mon–Fri: 8:00 AM – 7:00 PM
            </li>
            <li className="ml-6">Sat–Sun: 8:00 AM – 5:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-foam-50/50">
        © {new Date().getFullYear()} AquaStart Swim School. All rights reserved.
      </div>
    </footer>
  )
}
