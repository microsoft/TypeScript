///<reference path="fourslash.ts" />

// @allowJS: true
// @checkJs: true

// @filename: /a.ts
////export interface A {}

// @filename: /b.js
/////**
//// * @import { /**/ } from "./a"
//// */

verify.baselineCompletions();
