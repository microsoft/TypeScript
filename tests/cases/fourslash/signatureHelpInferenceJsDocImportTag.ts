///<reference path="fourslash.ts" />

// @allowJS: true
// @checkJs: true
// @module: esnext

// @filename: a.ts
////export interface Foo {}

// @filename: b.js
/////**
//// * @import {
//// *     Foo
//// * } from './a'
//// */
////
/////**
//// * @param {Foo} a
//// */
////function foo(a) {}
////foo(/**/)

verify.baselineSignatureHelp();
