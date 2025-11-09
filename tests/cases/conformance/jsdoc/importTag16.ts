// @declaration: true
// @emitDeclarationOnly: true
// @checkJs: true
// @allowJs: true

// @filename: a.ts
export default interface Foo {}
export interface I {}

// @filename: b.js
/** @import Foo, { I } from "./a" */

/**
 * @param {Foo} a
 * @param {I} b
 */
export function foo(a, b) {}
