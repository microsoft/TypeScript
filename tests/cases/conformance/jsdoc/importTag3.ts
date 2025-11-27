// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /types.ts
export default interface Foo {
    a: number;
}

// @filename: /foo.js
/**
 * @import Foo from "./types"
 */

/**
 * @param { Foo } foo
 */
export function f(foo) {}
