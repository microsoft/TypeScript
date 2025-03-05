// @checkJs: true
// @allowJs: true
// @target: esnext
// @noEmit: true

// @filename: /a.js
export class A {}

// @filename: /b.js
/**
 * {@link import('./a').A}
 */
export function fn() { }
