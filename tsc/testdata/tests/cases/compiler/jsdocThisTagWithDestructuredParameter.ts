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
