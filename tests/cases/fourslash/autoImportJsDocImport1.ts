/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @target: esnext
// @allowJs: true
// @checkJs: true

// @Filename: /foo.ts
//// export const A = 1;
//// export type B = { x: number };
//// export type C = 1;
//// export class D { y: string }

// @Filename: /test.js
/////**
//// * @import { A, D, C } from "./foo"
//// */
////
/////**
//// * @param { typeof A } a
//// * @param { B/**/ | C } b
//// * @param { C } c
//// * @param { D } d
//// */
////export function f(a, b, c, d) { }

goTo.marker("");
verify.importFixAtPosition([
`/**
 * @import { A, D, C, B } from "./foo"
 */

/**
 * @param { typeof A } a
 * @param { B | C } b
 * @param { C } c
 * @param { D } d
 */
export function f(a, b, c, d) { }`
]);
