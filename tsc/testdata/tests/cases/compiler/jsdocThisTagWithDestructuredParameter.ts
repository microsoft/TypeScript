// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @captureSuggestions: true

// @filename: /a.js

/**
 * @this {{ x: number }}
 * @param {{ title: string }} props
 */
export function withThis({ title }) {
  return this.x + title;
}

/**
 * @param {{ title: string }} props
 */
export function withoutThis({ title }) {
  return title;
}

/**
 * @this {{ x: number }}
 * @param {string} name
 */
export function withThisNamed(name) {
  return this.x + name;
}

// @filename: /b.js

/**
 * @this {{ x: number }}
 * @param {{ x: number }} this
 * @param {{ title: string }} props
 */
export function withDocumentedThis({ title }) {
  return this.x + title;
}

// @filename: /c.ts

/**
 * @param {{ x: number }} this
 * @param {{ title: string }} props
 */
export function withDocumentedThisReceiver(this: { x: number }, { title }: { title: string }) {
  return this.x + title;
}
