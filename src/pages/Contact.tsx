import { useState } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { usePageView } from '@/hooks/useApi'

export default function Contact() {
  usePageView('/contact')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    // No dedicated contact-message endpoint is specified in the API design
    // (see backend spec §19) — this simulates the submit for now. Wire this
    // up to a real endpoint once one exists, e.g. POST /api/contact.
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading
        title="Get in touch"
        description="Questions about a program, a schedule, or group rates? We're happy to help."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <Card className="flex items-start gap-3 p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-water-600" />
            <div>
              <p className="font-semibold text-ink">Location</p>
              <p className="text-sm text-ink/60">123 Poolside Avenue, Quezon City</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-water-600" />
            <div>
              <p className="font-semibold text-ink">Phone</p>
              <p className="text-sm text-ink/60">(02) 8123 4567</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-water-600" />
            <div>
              <p className="font-semibold text-ink">Email</p>
              <p className="text-sm text-ink/60">hello@aquastart.example</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-water-600" />
            <div>
              <p className="font-semibold text-ink">Hours</p>
              <p className="text-sm text-ink/60">Mon–Fri 8:00 AM–7:00 PM · Sat–Sun 8:00 AM–5:00 PM</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <h3 className="text-lg font-semibold text-ink">Message sent</h3>
              <p className="text-sm text-ink/60">We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <Input label="Full name" name="name" required />
              <Input label="Email" name="email" type="email" required />
              <Input label="Phone" name="phone" type="tel" className="sm:col-span-2" />
              <Textarea label="Message" name="message" required className="sm:col-span-2" />
              <Button type="submit" isLoading={isSubmitting} className="sm:col-span-2 sm:w-fit">
                Send message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
