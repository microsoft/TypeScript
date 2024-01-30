/// <reference path='fourslash.ts' />

// @allowJS: true
// @checkJs: true

// @Filename: /b.ts
////export interface A { }

// @Filename: /a.js
/////**
//// * @importType { A } from "./b";
//// */
////
/////**
//// * @param { [|A/**/|] } a
//// */
////function f(a) {}

verify.baselineFindAllReferences("");
