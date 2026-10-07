# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Calm, light, single-column utility UI with generous whitespace and one restrained teal accent that carries every result and focus state — plain, trustworthy and free of decoration, like a Stripe-sized settings card.

## Colors

- `--color-bg`: **#FFFFFF**
- `--color-surface`: **#F7F8FA**
- `--color-fg`: **#111827**
- `--color-muted`: **#6B7280**
- `--color-border`: **#E5E7EB**
- `--color-border-strong`: **#D1D5DB**
- `--color-accent`: **#0F766E**
- `--color-accent-hover`: **#0D6A63**
- `--color-accent-active`: **#0A564F**
- `--color-accent-soft`: **#E6F2F0**
- `--color-accent-fg`: **#FFFFFF**
- `--color-error`: **#B42318**
- `--color-error-bg`: **#FEF3F2**
- `--color-error-border`: **#FDA29B**
- `--color-focus-ring`: **#0F766E40**

## Typography

- `font_family`: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `heading_weight`: 600
- `body_weight`: 400
- `label_weight`: 500
- `size_base`: 16px
- `size_label`: 14px
- `size_helper`: 13px
- `size_heading`: 20px
- `size_result`: 26px
- `line_height`: 1.5
- `numeric`: font-variant-numeric: tabular-nums; use for ALL money values and inputs so digits never jitter while typing

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 10px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

Not rendered in v1 — the calculator has no button by design (AC-02: live recalculation, AC-10: no dead controls). Define it for future actions and keep it out of the page until it does something. Spec: font 14px/500, height 44px (min touch target), padding 0 20px, radius md, 1px border transparent. default: bg=accent #0F766E, text=accent-fg #FFFFFF. hover: bg=accent-hover #0D6A63. active: bg=accent-active #0A564F. focus-visible: 2px focus-ring #0F766E40 + 2px offset. disabled: opacity 0.5, cursor not-allowed, no hover change. Secondary variant: bg=bg #FFFFFF, text=fg #111827, border 1px border-strong #D1D5DB, hover bg=surface #F7F8FA.

### Page shell

Single view, no routing. Body bg=#FFFFFF. Vertical centering with a 32px top/bottom padding on mobile, top-aligned from 640px up. Content column max-width 480px, horizontally centered. Page heading 'Trinkgeld-Rechner' at size_heading 20px/600, color fg #111827, margin-bottom 4px; one muted subtitle line at 13px #6B7280 ('Trinkgeld, Gesamt und Betrag pro Person live berechnen'), margin-bottom 24px.

### Card / Panel

The two logical blocks — 'Eingaben' and 'Ergebnis' — are panels: bg=surface #F7F8FA is allowed, but v1 uses bg #FFFFFF with a 1px border #E5E7EB, radius lg 16px, padding 24px (16px at ≤480px), gap between the two panels 24px. The result panel swaps to bg=accent-soft #E6F2F0 and border #0F766E at 30% opacity once valid results exist, so the live output is unmistakably the 'answer'. No shadows.

### Number Input + Label

Label above the input, always (no floating labels): 14px/500 #111827, margin-bottom 8px. Input: width 100%, height 44px, padding 0 12px, font 16px (prevents iOS zoom), tabular-nums, right-aligned text is NOT used — left-aligned with the unit suffix shown as a static hint. bg #FFFFFF, border 1px #D1D5DB, radius md 10px, color #111827, placeholder #9CA3AF. hover: border #B9BFC7. focus: border #0F766E + 2px focus-ring #0F766E40, no outline. invalid (field touched AND value invalid): border #FDA29B, bg #FEF3F2. disabled: bg #F7F8FA, opacity 0.6. Vertical stack of the three fields with 16px gaps. inputmode='decimal' for Betrag/Prozent, inputmode='numeric' for Personenzahl; type='text' so a German comma is typeable — never type='number' (no spinner, no silent locale loss).

### Input hint / unit suffix

Static suffix inside the field on the right: '€', '%', 'Person(en)' at 14px #6B7280, non-interactive, pointer-events none. Purely a hint — it never changes a value, so it can never violate AC-10. Optional 13px helper line below the field in #6B7280 for the accepted range (e.g. 'mindestens 1').

### Result Row

Three rows, each: label left (14px/400 #6B7280) and value right (size_result 26px/600 #111827, tabular-nums, color accent #0F766E for the primary 'Gesamt' row only). Row height min 44px, vertical padding 12px, separated by a 1px #E5E7EB divider between rows. Values are right-aligned with fixed tabular digits so they do not jump while typing. Empty state: instead of a value, show an em dash '—' in #9CA3AF — never '0,00 €' and never an error (AC-05).

### Error Message

Replaces the whole result area when an input is invalid (AC-06): a block with role='alert', aria-live='polite', bg #FEF3F2, border 1px #FDA29B, radius md 10px, padding 12px 16px, text 14px/500 #B42318, with a small inline warning glyph. No result values are shown at the same time. German, non-technical, one sentence naming the field, e.g. 'Bitte für den Betrag eine Zahl von 0 oder größer eingeben.' Errors appear only after the user has touched a field (AC-05).

### Money value format

ONE format everywhere on the page, non-negotiable (AC-04): Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }) → thousands separator '.', decimal comma, exactly two decimals, non-breaking space before the sign: '1.234,56 €'. Never '€ 10.00', never a bare number, never a tilde. The same formatting string is used for Trinkgeld, Gesamt and Betrag pro Person.

## Layout Principles

- Single view, no routing, one content column, max-width 480px, horizontally centered; the whole page fits a 360×640 viewport without horizontal scrolling.
- Breakpoint 640px: below it the card padding is 16px and the page is vertically centered with 32px breathing room; at 640px and above padding is 24px and the block starts at 48px from the top.
- Vertical rhythm strictly from the spacing scale: 8px label→input, 16px field→field, 24px between the input panel, the result panel and the page heading, 32/48px to the viewport edges. No arbitrary pixel values.
- Every interactive element is at least 44×44px (inputs are 44px tall) so the same layout works for touch and mouse.
- Fixed element order top to bottom: heading, subtitle, Eingaben (Betrag, Trinkgeld-Prozent, Personenzahl), Ergebnis (Trinkgeld, Gesamt, Betrag pro Person). Never reorder, never split, never add a fourth input or result.
- Exactly three text styles: heading (20px/600), body+label (16px/14px, 400–500), result (26px/600). Everything money-related uses tabular-nums.
- All money values use the identical German formatting (comma, two decimals, non-breaking space, '€') — Trinkgeld, Gesamt and Betrag pro Person never differ in shape.
- Colour has meaning only: teal accent for the result and focus, red for errors, grey for muted labels and the neutral empty state '—'. No gradients, no shadows, no illustrations, no decorative fills.
- State model for the result area is exactly three states: neutral (untouched, shows '—'), results (valid, three formatted values), error (invalid, one German sentence instead of values) — never two at once (AC-05/06).
- Light theme only; no theme toggle, no persistence, no history, no language switcher — anything the spec does not ask for stays off the page, so no control is ever dead (AC-10).
