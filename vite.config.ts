import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // The scaffold ships no tests of its own; the calculation and formatting
    // tickets add theirs. Keep `vitest run` green until then.
    passWithNoTests: true,
  },
})
