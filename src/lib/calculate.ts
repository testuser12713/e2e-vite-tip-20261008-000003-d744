import type { TipInput, TipOutcome } from '../types'

const DECIMAL_PATTERN = /^[+-]?(\d+(\.\d*)?|\.\d+)$/

function parseDecimal(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.')
  if (normalized === '' || !DECIMAL_PATTERN.test(normalized)) {
    return null
  }
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

export function calculateTip(input: TipInput): TipOutcome {
  const amount = parseDecimal(input.amount)
  if (amount === null) {
    return {
      ok: false,
      error: input.amount.trim() === '' ? 'Bitte geben Sie einen Betrag ein.' : 'Bitte geben Sie einen gültigen Betrag ein.',
    }
  }
  if (amount < 0) {
    return { ok: false, error: 'Der Betrag darf nicht negativ sein.' }
  }

  const percent = parseDecimal(input.tipPercent)
  if (percent === null) {
    return {
      ok: false,
      error:
        input.tipPercent.trim() === ''
          ? 'Bitte geben Sie einen Trinkgeld-Prozentsatz ein.'
          : 'Bitte geben Sie einen gültigen Trinkgeld-Prozentsatz ein.',
    }
  }
  if (percent < 0) {
    return { ok: false, error: 'Der Trinkgeld-Prozentsatz darf nicht negativ sein.' }
  }

  const people = parseDecimal(input.people)
  if (people === null) {
    return {
      ok: false,
      error:
        input.people.trim() === ''
          ? 'Bitte geben Sie die Personenzahl ein.'
          : 'Bitte geben Sie eine gültige Personenzahl ein.',
    }
  }
  if (people < 1) {
    return { ok: false, error: 'Die Personenzahl muss mindestens 1 betragen.' }
  }

  const amountCents = Math.round(amount * 100)
  const tip = Math.round((amountCents * percent) / 100)
  const total = amountCents + tip
  const perPerson = Math.round(total / people)

  return { ok: true, result: { tip, total, perPerson } }
}
