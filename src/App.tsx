import { useState } from 'react'
import type { TipInput } from './types'
import { calculateTip } from './lib/calculate'
import { formatEuro } from './lib/format'

const EMPTY_INPUT: TipInput = { amount: '', tipPercent: '', people: '' }

export default function App() {
  const [input, setInput] = useState<TipInput>(EMPTY_INPUT)
  const [touched, setTouched] = useState(false)

  function update(field: keyof TipInput, value: string) {
    setTouched(true)
    setInput((prev) => ({ ...prev, [field]: value }))
  }

  const outcome = touched ? calculateTip(input) : null
  const result = outcome && outcome.ok ? outcome.result : null
  const error = outcome && !outcome.ok ? outcome.error : null

  return (
    <main className="page">
      <div className="shell">
        <header className="page-header">
          <h1 className="page-title">Trinkgeld-Rechner</h1>
          <p className="page-subtitle">
            Trinkgeld, Gesamt und Betrag pro Person live berechnen
          </p>
        </header>

        <section className="panel" aria-labelledby="inputs-title">
          <h2 className="panel-title" id="inputs-title">
            Eingaben
          </h2>
          <div className="fields">
            <div className="field">
              <label className="field-label" htmlFor="amount">
                Betrag (€)
              </label>
              <div className="input-wrap">
                <input
                  id="amount"
                  className="field-input"
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={input.amount}
                  onChange={(event) => update('amount', event.target.value)}
                />
                <span className="input-suffix" aria-hidden="true">
                  €
                </span>
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="tipPercent">
                Trinkgeld (%)
              </label>
              <div className="input-wrap">
                <input
                  id="tipPercent"
                  className="field-input"
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={input.tipPercent}
                  onChange={(event) => update('tipPercent', event.target.value)}
                />
                <span className="input-suffix" aria-hidden="true">
                  %
                </span>
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="people">
                Personenzahl
              </label>
              <div className="input-wrap">
                <input
                  id="people"
                  className="field-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="1"
                  value={input.people}
                  onChange={(event) => update('people', event.target.value)}
                />
                <span className="input-suffix" aria-hidden="true">
                  Person(en)
                </span>
              </div>
              <p className="field-helper">mindestens 1</p>
            </div>
          </div>
        </section>

        <section
          className={result ? 'panel panel--result-valid' : 'panel'}
          aria-labelledby="result-title"
        >
          <h2 className="panel-title" id="result-title">
            Ergebnis
          </h2>

          {result ? (
            <dl className="results">
              <div className="result-row">
                <dt className="result-label">Trinkgeld</dt>
                <dd className="result-value">{formatEuro(result.tip)}</dd>
              </div>
              <div className="result-row">
                <dt className="result-label">Gesamt</dt>
                <dd className="result-value result-value-primary">
                  {formatEuro(result.total)}
                </dd>
              </div>
              <div className="result-row">
                <dt className="result-label">Betrag pro Person</dt>
                <dd className="result-value">{formatEuro(result.perPerson)}</dd>
              </div>
            </dl>
          ) : error ? (
            <div className="error" role="alert" aria-live="polite">
              <svg
                className="error-icon"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M7.13 2.5a1 1 0 0 1 1.74 0l5.5 8.9A1 1 0 0 1 13.5 13h-11a1 1 0 0 1-.87-1.5l5.5-9Z"
                  fill="currentColor"
                />
                <rect x="7.25" y="5.6" width="1.5" height="3.3" rx="0.6" fill="#fff" />
                <circle cx="8" cy="10.5" r="0.85" fill="#fff" />
              </svg>
              <span>{error}</span>
            </div>
          ) : (
            <dl className="results">
              <div className="result-row">
                <dt className="result-label">Trinkgeld</dt>
                <dd className="result-value result-value-empty">—</dd>
              </div>
              <div className="result-row">
                <dt className="result-label">Gesamt</dt>
                <dd className="result-value result-value-primary result-value-empty">
                  —
                </dd>
              </div>
              <div className="result-row">
                <dt className="result-label">Betrag pro Person</dt>
                <dd className="result-value result-value-empty">—</dd>
              </div>
            </dl>
          )}
        </section>
      </div>
    </main>
  )
}
