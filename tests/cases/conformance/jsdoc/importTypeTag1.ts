// @checkJs: true
// @allowJs: true
// @noEmit: true

// @filename: /types.ts
export interface Foo {
    a: number;
}

// @filename: /foo.js
/**
 * @importType { Foo } from "./types"
 */

/**
 * @param { Foo } foo
 */
function f(foo) {}
