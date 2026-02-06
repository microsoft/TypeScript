/// <reference path='fourslash.ts'/>

// @allowJS: true
// @checkJs: true

// @Filename: /b.ts
/////*2*/export interface A { }

// @Filename: /a.js
/////**
//// * @import { A } from      [|"./b/*1*/"|]
//// */

verify.baselineGoToDefinition("1");
