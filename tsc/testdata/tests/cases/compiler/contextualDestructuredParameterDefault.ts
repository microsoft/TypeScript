// @strict: true
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @target: es2022
// @lib: es2022,dom

// Regression tests for https://github.com/microsoft/TypeScript/issues/65011
// Contextual typing of a destructuring parameter with a default must reach binding elements.

// @filename: /a.js
/** @typedef {{ signal?: AbortSignal }} Opts */
/** @typedef {{ structure: (c: string, o?: Opts) => Promise<string[]> }} Adapter */
/** @returns {Adapter} */
export function make() {
  return {
    async structure(c, { signal } = {}) {
      signal?.throwIfAborted()
      return [c]
    },
  }
}

/** @typedef {(n: number, o?: Opts) => Promise<void>} Fn */
export const p = /** @type {Fn} */ (async (n, { signal } = {}) => {
  signal?.throwIfAborted()
})

// @filename: /b.ts
type O = { signal?: AbortSignal }
const f: (o?: O) => void = ({ signal } = {}) => { signal?.throwIfAborted() }
