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
 * { A, B }
 * from "./types"
 */

/**
 * @param { A } a
 * @param { B } b
 */
function f(a, b) {}
