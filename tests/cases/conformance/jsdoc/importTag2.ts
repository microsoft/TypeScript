// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /types.ts
export interface Foo {
    a: number;
}

// @filename: /foo.js
/**
 * @import * as types from "./types"
 */

/**
 * @param { types.Foo } foo
 */
export function f(foo) {}
