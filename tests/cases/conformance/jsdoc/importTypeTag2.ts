// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /types.ts
export interface Foo {
    a: number;
}

// @filename: /foo.js
/**
 * @importType * as types from "./types"
 */

/**
 * @param { types.Foo } foo
 */
export function f(foo) {}
