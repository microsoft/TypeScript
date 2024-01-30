///<reference path="fourslash.ts" />

// @allowJS: true
// @checkJs: true

// @filename: /a.ts
////export interface A {}

// @filename: /b.js
/////**
//// * @importType { /**/ } from "./a"
//// */

verify.baselineCompletions();
