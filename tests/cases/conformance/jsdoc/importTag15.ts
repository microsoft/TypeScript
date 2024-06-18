// @declaration: true
// @emitDeclarationOnly: true
// @module: esnext,es2015
// @checkJs: true
// @allowJs: true

// @filename: 0.ts
export interface I { }

// @filename: 1.js
/** @import { I } from './0' with { type: "json" } */
/** @import * as foo from './0' with { type: "json" } */

/** @param {I} a */
function f(a) {}
