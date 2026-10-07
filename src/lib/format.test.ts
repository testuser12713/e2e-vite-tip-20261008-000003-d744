import { describe, expect, it } from 'vitest'
import { formatEuro } from './format'

describe('formatEuro', () => {
  it('formats 0 cents as 0,00 €', () => {
    expect(formatEuro(0)).toBe('0,00\u00A0€')
  })

  it('formats 1000 cents as 10,00 €', () => {
    expect(formatEuro(1000)).toBe('10,00\u00A0€')
  })

  it('formats 12345 cents as 123,45 €', () => {
    expect(formatEuro(12345)).toBe('123,45\u00A0€')
  })

  it('uses a comma as decimal separator and the Euro sign at the end', () => {
    const formatted = formatEuro(123456)
    expect(formatted.endsWith('€')).toBe(true)
    expect(formatted).toContain(',')
  })
})
