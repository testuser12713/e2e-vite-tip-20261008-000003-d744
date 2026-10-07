import { useState } from 'react'
import type { TipInput } from './types'

const EMPTY_INPUT: TipInput = { amount: '', tipPercent: '', people: '' }

export default function App() {
  const [input, setInput] = useState<TipInput>(EMPTY_INPUT)

  function update(field: keyof TipInput, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }))
  }

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

        <section className="panel" aria-labelledby="result-title">
          <h2 className="panel-title" id="result-title">
            Ergebnis
          </h2>
          <dl className="results">
            <div className="result-row">
              <dt className="result-label">Trinkgeld</dt>
              <dd className="result-value">—</dd>
            </div>
            <div className="result-row">
              <dt className="result-label">Gesamt</dt>
              <dd className="result-value result-value-primary">—</dd>
            </div>
            <div className="result-row">
              <dt className="result-label">Betrag pro Person</dt>
              <dd className="result-value">—</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  )
}
