import { Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Lessons from '@/pages/Lessons'
import Instructors from '@/pages/Instructors'
import Schedule from '@/pages/Schedule'
import Contact from '@/pages/Contact'
import BookingPage from '@/pages/Booking/BookingPage'
import NotFound from '@/pages/NotFound'

export function AppRouter() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageLayout>
  )
}
