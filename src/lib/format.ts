const euroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

export function formatEuro(cents: number): string {
  return euroFormatter.format(cents / 100)
}
