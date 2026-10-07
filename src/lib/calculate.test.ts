import { describe, expect, it } from 'vitest'
import type { TipInput, TipOutcome } from '../types'
import { calculateTip } from './calculate'

function input(amount: string, tipPercent: string, people: string): TipInput {
  return { amount, tipPercent, people }
}

function expectError(outcome: TipOutcome): string {
  expect(outcome.ok).toBe(false)
  if (outcome.ok) {
    throw new Error('expected an error outcome')
  }
  return outcome.error
}

describe('calculateTip', () => {
  it('calculates the standard case in whole cents', () => {
    const outcome = calculateTip(input('100', '10', '2'))
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 1000, total: 11000, perPerson: 5500 },
    })
  })

  it('accepts the German decimal comma', () => {
    const outcome = calculateTip(input('100,50', '10', '2'))
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 1005, total: 11055, perPerson: 5528 },
    })
  })

  it('accepts surrounding whitespace', () => {
    const outcome = calculateTip(input('  24,00 ', ' 10 ', ' 3 '))
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 240, total: 2640, perPerson: 880 },
    })
  })

  it('rounds the amount up to the next cent', () => {
    const outcome = calculateTip(input('0,005', '0', '1'))
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 1, perPerson: 1 },
    })
  })

  it('rounds the amount down to the previous cent', () => {
    const outcome = calculateTip(input('0,004', '0', '1'))
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 0, perPerson: 0 },
    })
  })

  it('rounds the tip up to the next cent', () => {
    const outcome = calculateTip(input('10,05', '15', '1'))
    // 1005 cents * 15 / 100 = 150.75 -> 151
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 151, total: 1156, perPerson: 1156 },
    })
  })

  it('rounds the tip down to the previous cent', () => {
    const outcome = calculateTip(input('10,01', '10', '1'))
    // 1001 cents * 10 / 100 = 100.1 -> 100
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 100, total: 1101, perPerson: 1101 },
    })
  })

  it('rounds the per-person amount when the division leaves a remainder', () => {
    const outcome = calculateTip(input('1', '0', '3'))
    // 100 cents / 3 = 33.33 -> 33
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 100, perPerson: 33 },
    })
  })

  it('rounds a per-person remainder up', () => {
    const outcome = calculateTip(input('1', '0', '6'))
    // 100 cents / 6 = 16.67 -> 17
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 100, perPerson: 17 },
    })
  })

  it('rejects an empty amount with a German message', () => {
    expect(expectError(calculateTip(input('', '10', '2')))).toMatch(/Betrag/)
  })

  it('rejects an empty percent with a German message', () => {
    expect(expectError(calculateTip(input('10', '', '2')))).toMatch(/Prozentsatz/)
  })

  it('rejects an empty person count with a German message', () => {
    expect(expectError(calculateTip(input('10', '10', '')))).toMatch(/Personenzahl/)
  })

  it('rejects a non-numeric amount with a German message', () => {
    expect(expectError(calculateTip(input('abc', '10', '2')))).toMatch(/Betrag/)
  })

  it('rejects a non-numeric percent with a German message', () => {
    expect(expectError(calculateTip(input('10', 'abc', '2')))).toMatch(/Prozentsatz/)
  })

  it('rejects a non-numeric person count with a German message', () => {
    expect(expectError(calculateTip(input('10', '10', 'many')))).toMatch(/Personenzahl/)
  })

  it('rejects a negative amount with a German message', () => {
    expect(expectError(calculateTip(input('-5', '10', '2')))).toMatch(/negativ/)
  })

  it('rejects a negative percent with a German message', () => {
    expect(expectError(calculateTip(input('10', '-1', '2')))).toMatch(/negativ/)
  })

  it('rejects a person count of 0', () => {
    expect(expectError(calculateTip(input('10', '10', '0')))).toMatch(/mindestens 1/)
  })

  it('rejects a person count below 1', () => {
    expect(expectError(calculateTip(input('10', '10', '0.5')))).toMatch(/mindestens 1/)
  })

  it('never throws on user input', () => {
    expect(() => calculateTip(input('', '', ''))).not.toThrow()
    expect(() => calculateTip(input('abc', '-', 'x'))).not.toThrow()
  })
})
