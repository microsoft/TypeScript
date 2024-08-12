/// <reference path='fourslash.ts' />

// @strict: true
// @checkJs: true
// @allowJs: true

// @filename: global.d.ts
//// interface ImportAttributes { 
////   type: "json";
//// }

// @filename: index.js
//// /** @import * as ns from "" with { type: "/**/" } */

verify.completions({
  marker: "",
  exact: ["json"],
  isNewIdentifierLocation: false,
});
