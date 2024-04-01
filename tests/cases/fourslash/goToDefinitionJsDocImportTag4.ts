/// <reference path='fourslash.ts'/>

// @allowJS: true
// @checkJs: true

// @Filename: /b.ts
////export interface /*2*/A { }

// @Filename: /a.js
/////**
//// * @import { [|A/*1*/|] } from "./b";
//// */

verify.baselineGoToDefinition("1");
