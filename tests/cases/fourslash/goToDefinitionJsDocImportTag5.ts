/// <reference path='fourslash.ts'/>

// @allowJS: true
// @checkJs: true

// @Filename: /b.ts
////export interface /*2*/A { }

// @Filename: /a.js
/////**
//// * @import { A } from "./b";
//// */
////
/////**
//// * @param { [|A/*1*/|] } a
//// */
////function f(a) {}

verify.baselineGoToDefinition("1");
