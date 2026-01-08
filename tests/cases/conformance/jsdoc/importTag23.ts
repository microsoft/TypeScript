// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /a.ts
export interface I {
    foo(): void;
}

// @filename: /b.js
/**
 * @import * as NS from './a'
 */

/** @implements {NS.I} */
export class C {}
