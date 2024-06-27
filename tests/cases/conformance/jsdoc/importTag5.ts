// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /types.ts
export interface Foo {
    a: number;
}

// @filename: /foo.js
/**
 * @import { Foo } from "./types"
 */

/**
 * @param { Foo } foo
 */
function f(foo) {}
