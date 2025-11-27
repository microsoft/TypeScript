// @declaration: true
// @emitDeclarationOnly: true
// @checkJs: true
// @allowJs: true

// @filename: a.ts
export interface Foo {}

// @filename: b.js
/**
 * @import { Foo }
 * from "./a"
 */

/**
 * @param {Foo} a
 */
export function foo(a) {}
