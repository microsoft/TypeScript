// @noEmit: true
// @module: esnext

// @filename: /a.ts
export interface A {}

// @filename: /b.ts
/**
 * {@link import('./a').A}
 */
export function fn() { }
