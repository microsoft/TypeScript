/// <reference path='fourslash.ts' />

// @allowJS: true
// @checkJs: true

// @Filename: /b.ts
////export interface A { }

// @Filename: /a.js
/////**
//// * @import { A } from "./b";
//// */
////
/////**
//// * @param { [|A/**/|] } a
//// */
////function f(a) {}

verify.baselineFindAllReferences("");
