import { Link } from 'react-router-dom'

import { SectionHeading } from '@/components/shared/SectionHeading'
import { Testimonials } from '@/components/shared/Testimonials'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { LessonCard } from '@/components/lessons/LessonCard'
import { InstructorCard } from '@/components/instructors/InstructorCard'
import { useApi, usePageView } from '@/hooks/useApi'
import { lessonService } from '@/services/lessonService'
import { instructorService } from '@/services/instructorService'

const INQUIRY_URL = 'https://forms.gle/fdhyyZJwZ2esvrH18'
const BOOKING_PATH = '/book'

/**
 * Photography lives here so it can be swapped in one place.
 * Replace these with your own photos of your pool, coaches and swimmers
 * (e.g. /images/hero.jpg) for the most authentic result.
 */
const PHOTOS = {
  hero: {
    src: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=2000&q=85',
    alt: 'Swimmer training in a pool',
  },
  levels: {
    src: 'https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Swimming pool ready for a lesson',
  },
  closing: {
    src: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=85',
    alt: 'Swimmer enjoying time in clear blue water',
  },
}

const facts = [
  { label: 'Who it\'s for', value: 'Kids, teens and adults, from first-timers to advanced swimmers' },
  { label: 'Lesson format', value: 'One-hour sessions in a 10-session program' },
  { label: 'When we teach', value: 'Weekdays and Saturday mornings' },
]

const principles = [
  {
    title: 'Learn at your own pace',
    copy: 'Lessons are shaped around your experience, comfort level, and goals.',
  },
  {
    title: 'Feel supported',
    copy: 'Build confidence with patient guidance and individual attention.',
  },
  {
    title: 'Start where you are',
    copy: 'Whether it is your first lesson or you are improving your strokes, there is a place to begin.',
  },
]

const levels = [
  {
    title: 'Water Familiarization',
    audience: 'New to the water',
    description: 'Get comfortable in the pool, practice breathing, and take your first steps toward water confidence.',
  },
  {
    title: 'Toddler & Beginner',
    audience: 'Build the basics',
    description: 'Learn foundational skills such as floating, kicking, and moving through the water with guidance.',
  },
  {
    title: 'Intermediate',
    audience: 'Grow your skills',
    description: 'Improve body position, breathing, and stroke technique as your confidence grows.',
  },
  {
    title: 'Advanced',
    audience: 'Refine your technique',
    description: 'Work on smoother, more efficient strokes and develop the skills you want to improve.',
  },
]

const hours = [
  { day: 'Monday to Friday', session: 'Morning', time: '7:00 AM - 11:00 AM' },
  { day: 'Monday to Friday', session: 'Afternoon', time: '3:00 PM - 5:00 PM' },
  { day: 'Saturday', session: 'Morning', time: '7:00 AM - 9:00 AM' },
]

const steps = [
  {
    title: 'Tell us about the swimmer',
    copy: 'Share the swimmer\'s age, experience, and what they would like to learn.',
  },
  {
    title: 'Choose a suitable time',
    copy: 'Let us know your preferred schedule so we can check lesson availability.',
  },
  {
    title: 'Confirm your first lesson',
    copy: 'We\'ll coordinate the details with you before your lesson is booked.',
  },
]

/* Shared class strings keep buttons and links consistent across the page. */
const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
const btnPrimary = `inline-flex min-h-12 items-center justify-center rounded-sm bg-cyan-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-cyan-800 ${ring} focus-visible:outline-cyan-700`
const btnOnDark = `inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 py-3 text-base font-semibold text-[#073B4C] transition-colors hover:bg-cyan-50 ${ring} focus-visible:outline-white`
const btnGhostOnDark = `inline-flex min-h-12 items-center justify-center rounded-sm border border-white/60 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10 ${ring} focus-visible:outline-white`
const textLink = `font-semibold text-cyan-800 underline underline-offset-4 hover:text-cyan-950 ${ring} focus-visible:outline-cyan-700`
const externalProps = { target: '_blank', rel: 'noreferrer' } as const

export default function Home() {
  usePageView('/')
  const lessons = useApi(() => lessonService.list(), [])
  const instructors = useApi(() => instructorService.list(), [])

  return (
    <main className="bg-white pb-24 text-slate-800 sm:pb-0">
      {/* HERO: photo first, solid text panel */}
      <section aria-labelledby="hero-title">
        <div className="relative">
          <img
            src={PHOTOS.hero.src}
            alt={PHOTOS.hero.alt}
            fetchPriority="high"
            className="h-[48vh] min-h-[300px] w-full object-cover sm:h-[58vh] lg:h-[680px]"
          />
          <div className="bg-[#073B4C] lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent">
            <div className="container-page">
              <div className="py-9 sm:py-12 lg:max-w-xl lg:bg-[#073B4C] lg:p-10">
                <h1
                  id="hero-title"
                  className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
                >
                  Learn to swim at a pace that feels right.
                </h1>
                <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                  Swimming lessons for kids, teens, and adults, from first-time swimmers to those refining their strokes.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={BOOKING_PATH} className={btnOnDark}>
                    Book a lesson
                  </Link>
                  <a href={INQUIRY_URL} {...externalProps} className={btnGhostOnDark}>
                    Ask a question
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LESSON FACTS: the answers people look for first */}
      <section aria-label="Lesson overview" className="border-b border-slate-200">
        <dl className="container-page grid sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-slate-200 py-5 first:border-t-0 sm:border-t-0 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="text-sm text-slate-600">{fact.label}</dt>
              <dd className="mt-1 text-base font-semibold leading-6 text-[#073B4C]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* HOW WE TEACH */}
      <section aria-labelledby="teach-title" className="py-16 sm:py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="teach-title" className="text-3xl font-semibold leading-tight tracking-tight text-[#073B4C] sm:text-4xl">
              Swimming is a skill for life.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-700">
              Learning to swim can feel like a big step, especially at the beginning. Our aim is to make that first step feel more manageable with lessons that focus on the swimmer, their goals, and the skills they are ready to learn.
            </p>
          </div>
          <dl className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
            {principles.map((item) => (
              <div key={item.title} className="grid gap-1 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="text-lg font-semibold text-[#073B4C]">{item.title}</dt>
                <dd className="text-base leading-7 text-slate-700">{item.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* LEVELS */}
      <section id="programs" aria-labelledby="levels-title" className="scroll-mt-20 bg-[#F6FAFA] py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 id="levels-title" className="text-3xl font-semibold tracking-tight text-[#073B4C] sm:text-4xl">
              Lessons for every stage
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Choose the level that sounds closest to where you are now. If you’re unsure, ask us and we can help you decide.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <img
                src={PHOTOS.levels.src}
                alt={PHOTOS.levels.alt}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover lg:aspect-[4/5]"
              />
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-slate-300 border-y border-slate-300">
                {levels.map((level) => (
                  <li key={level.title} className="py-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="text-xl font-semibold text-[#073B4C]">{level.title}</h3>
                      <p className="text-sm font-medium text-cyan-800">{level.audience}</p>
                    </div>
                    <p className="mt-2 max-w-xl text-base leading-7 text-slate-700">{level.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base text-slate-700">
                Not sure where to start?{' '}
                <a href={INQUIRY_URL} {...externalProps} className={textLink}>
                  Ask us which level fits
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABLE LESSONS (API) */}
      <section id="lessons" aria-labelledby="lessons-title" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            title="Available lessons"
            description="Browse the lesson options currently listed by AquaStart."
            action={
              <Link to="/lessons" className={textLink}>
                View all lessons
              </Link>
            }
          />
          {lessons.isLoading && <LoadingSpinner label="Loading lessons" />}
          {lessons.status === 'error' && (
            <ErrorMessage message="We couldn't load the lesson list just now. You can still contact us to ask about available programs." />
          )}
          {lessons.data && lessons.data.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.data.slice(0, 3).map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}
          {lessons.data?.length === 0 && (
            <p className="mt-5 border border-dashed border-slate-300 px-5 py-6 text-sm leading-6 text-slate-700">
              Lesson listings are being updated. Send us an inquiry and we\'ll share the current options with you.
            </p>
          )}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to={BOOKING_PATH} className={btnPrimary}>
              Book a lesson
            </Link>
            <a href={INQUIRY_URL} {...externalProps} className={textLink}>
              Or send us an inquiry
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* INSTRUCTORS (API) */}
      <section aria-labelledby="instructors-title" className="border-y border-slate-100 bg-[#F6FAFA] py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            title="Meet your instructors"
            description="Get to know the people who will help you build your skills in the water."
            action={
              <Link to="/instructors" className={textLink}>
                Meet the team
              </Link>
            }
          />
          {instructors.isLoading && <LoadingSpinner label="Loading instructors" />}
          {instructors.status === 'error' && (
            <ErrorMessage message="We couldn't load instructor profiles just now. Please check back or contact us for more information." />
          )}
          {instructors.data && instructors.data.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {instructors.data.slice(0, 3).map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          )}
          {instructors.data?.length === 0 && (
            <p className="mt-5 text-sm leading-6 text-slate-700">
              Instructor profiles are being updated. Contact us if you\'d like to know more about the team.
            </p>
          )}
        </div>
      </section>

      {/* SCHEDULE + HOW IT WORKS */}
      <section id="schedule" aria-labelledby="schedule-title" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="schedule-title" className="text-3xl font-semibold tracking-tight text-[#073B4C] sm:text-4xl">
              When we teach
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-700">
              These are the regular lesson hours. Please contact us to confirm the exact date and time before making plans.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] border-y border-slate-300 text-left text-base">
                <caption className="sr-only">Regular lesson hours</caption>
                <thead>
                  <tr className="border-b border-slate-300 text-sm text-slate-600">
                    <th scope="col" className="py-3 pr-4 font-medium">Day</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Session</th>
                    <th scope="col" className="py-3 font-medium">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {hours.map((row) => (
                    <tr key={`${row.day}-${row.session}`}>
                      <th scope="row" className="py-4 pr-4 font-semibold text-[#073B4C]">{row.day}</th>
                      <td className="py-4 pr-4 text-slate-700">{row.session}</td>
                      <td className="py-4 font-medium text-[#073B4C]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">
              Lesson times are subject to availability and confirmation. Ask us which one-hour session times are open on your preferred date.
            </p>
            <a href={INQUIRY_URL} {...externalProps} className={`${textLink} mt-4 inline-block`}>
              Ask about availability
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#073B4C] sm:text-4xl">
              Your first lesson starts with a conversation.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-700">
              Tell us a little about the swimmer and what you hope to work on. We\'ll help you understand the next steps.
            </p>
            <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-300">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
                  <span className="text-2xl font-semibold leading-7 text-cyan-800" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#073B4C]">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-base leading-7 text-slate-700">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <Link to={BOOKING_PATH} className={btnPrimary}>
                Book a lesson
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section aria-labelledby="testimonials-title" className="border-t border-slate-100 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            title="Every swimmer starts somewhere."
            description="Hear from swimmers and families about their experiences with AquaStart."
          />
          <div className="mt-6">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* CLOSING CTA: photo beside a solid panel */}
      <section aria-labelledby="closing-title" className="grid bg-[#073B4C] lg:grid-cols-2">
        <img
          src={PHOTOS.closing.src}
          alt={PHOTOS.closing.alt}
          loading="lazy"
          className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[440px]"
        />
        <div className="flex items-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="max-w-md">
            <h2 id="closing-title" className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Let's find the right lesson for you.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              Tell us about your swimming experience and the times that work for you. We\'ll help you figure out the next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={BOOKING_PATH} className={btnOnDark}>
                Book a lesson
              </Link>
              <a href={INQUIRY_URL} {...externalProps} className={btnGhostOnDark}>
                Send an inquiry
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE BOOKING BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
        <Link to={BOOKING_PATH} className={`${btnPrimary} w-full`}>
          Book a lesson
        </Link>
      </div>
    </main>
  )
}
