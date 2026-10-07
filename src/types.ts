export interface TipInput {
  amount: string
  tipPercent: string
  people: string
}

export interface TipResult {
  tip: number
  total: number
  perPerson: number
}

export type TipOutcome = { ok: true; result: TipResult } | { ok: false; error: string }
