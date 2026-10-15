import { useState } from 'react'
import type { FormEvent } from 'react'
import type { BookingCustomerInfo } from '@/types/booking'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

interface Props {
  initial: BookingCustomerInfo
  onSubmit: (info: BookingCustomerInfo) => void
  onBack: () => void
}

type Errors = Partial<Record<keyof BookingCustomerInfo, string>>

export function CustomerInfoStep({ initial, onSubmit, onBack }: Props) {
  const [form, setForm] = useState<BookingCustomerInfo>(initial)
  const [errors, setErrors] = useState<Errors>({})

  function validate(): Errors {
    const e: Errors = {}
    if (!form.full_name.trim()) e.full_name = 'Full name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    if (form.age === '' || Number(form.age) <= 0) e.age = 'Enter a valid age.'
    return e
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length === 0) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-lg font-semibold text-ink">Step 4 — Your information</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          name="full_name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          error={errors.full_name}
          className="sm:col-span-2"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
        />
        <Input
          label="Age"
          name="age"
          type="number"
          min={1}
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value === '' ? '' : Number(e.target.value) })}
          error={errors.age}
        />
        <Textarea
          label="Notes (optional)"
          name="notes"
          placeholder="Anything we should know — allergies, comfort level, prior lessons…"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="sm:col-span-2"
        />
      </div>
      <div className="mt-6 flex gap-3">
        <Button type="submit">Continue</Button>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  )
}
