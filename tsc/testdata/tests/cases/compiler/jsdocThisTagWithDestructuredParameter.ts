// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

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
