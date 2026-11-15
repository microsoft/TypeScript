// @target: es2015
// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @declarationMap: true

// @filename: /types.ts
export interface Foo {
    a: number;
}
export interface Unused {
    unused: true;
}

// @filename: /foo.js
/**
 * @import { Foo } from "./types"
 */

/**
 * @param { Foo } foo
 */
function f(foo) {}

// @filename: /imports.js
/**
 * @import { Foo, Unused } from "./types"
 */
/**
 * @param {Foo} foo
 */
export function filtered(foo) {
    return foo;
}
/**
 * @import * as types from "./types"
 */
/**
 * @param {types.Foo} foo
 */
export function namespace(foo) {
    return foo;
}
