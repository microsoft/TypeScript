// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /types.ts
export interface A {
    a: number;
}
export interface B {
    a: number;
}

// @filename: /foo.js
/**
 * @import
 * * as types
 * from "./types"
 */

/**
 * @param { types.A } a
 * @param { types.B } b
 */
function f(a, b) {}
