/// <reference path="fourslash.ts" />

// @module: es2015

// @Filename: /exports.ts
//// export interface SomeInterface {}

// @Filename: /a.ts
//// import type { SomeInterface } from "./exports.js";
//// const SomeInterface = {};
//// SomeI/**/

// Should NOT promote this
verify.completions({
  marker: "",
  includes: [{
    name: "SomeInterface"
  }]
});
