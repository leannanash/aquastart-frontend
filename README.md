# AquaStart — Frontend

React + TypeScript + Vite + Tailwind frontend for the AquaStart swimming lesson
booking platform. This covers Phases 6–8 of the project plan: public website,
booking flow, and the shared component/service layer the admin dashboard will
build on next.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Axios (centralized API layer)
- Recharts + Lucide React (installed, ready for the admin dashboard phase)

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_URL once the Laravel API exists
npm run dev
```

The app runs against `VITE_API_URL` (see `src/services/api.ts`). **Until the
Laravel backend exists, every service function (`lessonService`,
`instructorService`, `scheduleService`, `bookingService`) automatically falls
back to demo data in `src/data/mockData.ts`** so the site is fully clickable
today. Once the backend is live, nothing in the pages/components needs to
change — the services just start getting real responses instead of falling
back. `src/data/mockData.ts` is clearly marked dev-only and never imported
directly by a page or component.

## What's built

- **Public site**: Home, About, Lessons (with level filter), Instructors,
  Schedule (available slots grouped by date), Contact.
- **Booking flow** (`/book`): 6-step flow — lesson → date → time → customer
  info → summary → confirmation — with client-side validation, a step
  indicator, and deep-linking (`/book?lesson=1&schedule=4`) from lesson/
  schedule cards elsewhere on the site.
- **Reusable component library** in `src/components/ui` (Button, Card, Modal,
  Input, Select, Textarea, Badge, LoadingSpinner, EmptyState, ErrorMessage)
  plus domain components (`LessonCard`, `InstructorCard`, `BookingCard`,
  `BookingStatusBadge`, `StepIndicator`).
- **Typed API layer** in `src/services` + `src/types`, matching the REST
  endpoints from the project spec (`/lessons`, `/instructors`,
  `/schedules/available`, `/bookings`, `/auth/*`, `/analytics/events`, etc.).
  Axios attaches a Sanctum bearer token from `localStorage` automatically.
- **Analytics tracking hook** (`usePageView`) fires a `page_view` event on
  every page and `booking_started` / `booking_page_visit` /
  `booking_completed` at the right points in the booking flow, ready for a
  real `/api/analytics/events` endpoint.

## Not built yet (by design — later phases)

- `/admin/*` dashboard, calendar, and analytics charts — these need real
  authentication (Sanctum) and live data, so they're phase 9+ once the
  Laravel backend exists.
- Customer login / booking history — the spec marks this optional ("if
  customer authentication is implemented").
- The Contact page form currently simulates a submit; wire it to a real
  endpoint (e.g. `POST /api/contact`) once one exists — it wasn't in the
  original API list.

## Content note

I couldn't pull details from the linked Facebook page (Facebook blocks
automated access, and a search for it didn't surface anything usable), so
all business copy — name, address, phone, hours, instructor bios,
testimonials — is placeholder content under the "AquaStart" name. Swap in
real details in:
- `src/components/layout/Footer.tsx` and `src/pages/Contact.tsx` (address,
  phone, hours, email, social links)
- `src/data/mockData.ts` (lessons, instructors, testimonials — until the
  backend seed data replaces it)

## Project structure

```
src/
  types/        API response & domain types
  services/     axios calls, one file per resource, with mock fallback
  data/         dev-only mock data (never imported by pages directly)
  hooks/        useApi (generic fetch state), usePageView (analytics)
  components/
    ui/         generic building blocks
    layout/     Navbar, Footer, PageLayout
    lessons/ instructors/ booking/   domain-specific cards
    shared/     SectionHeading, Testimonials, LaneLines (brand motif)
  pages/        one file per route, Booking/ holds the 6-step flow
  router/       route table
```
