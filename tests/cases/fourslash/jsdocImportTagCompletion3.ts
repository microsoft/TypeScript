///<reference path="fourslash.ts" />

// @allowJS: true
// @checkJs: true
// @module: esnext

// @filename: ./a.ts
////export interface A {}

// @filename: ./b.ts
////export interface B {}

// @filename: ./c.js
/////**
//// * @import * as types from ".//**/"
//// */

verify.baselineCompletions();
