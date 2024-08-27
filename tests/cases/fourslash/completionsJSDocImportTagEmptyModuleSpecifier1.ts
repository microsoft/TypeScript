/// <reference path='fourslash.ts' />

// @strict: true
// @checkJs: true
// @allowJs: true
// @moduleResolution: nodenext

// @filename: node_modules/pkg/index.d.ts
//// export type MyUnion = string | number;

// @filename: index.js
//// /** @import { MyUnion } from "/**/" */

verify.completions({
  marker: "",
  exact: ["pkg"],
  isNewIdentifierLocation: true,
});
