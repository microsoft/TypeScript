/// <reference path="fourslash.ts" />

// @allowJs: true
// @noEmit: true
// @module: commonjs
// @noUncheckedSideEffectImports: true

// @filename: moduleA/a.js
//// import "b";
//// import "c";

// @filename: node_modules/b.ts
//// var a = 10;

// @filename: node_modules/c.js
//// exports.a = 10;
//// c = 10;

verify.getSuggestionDiagnostics([]);
