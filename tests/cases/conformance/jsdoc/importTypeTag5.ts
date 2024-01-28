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
 * @importType { Foo } from "./types"
 */

/**
 * @param { Foo } foo
 */
function f(foo) {}
