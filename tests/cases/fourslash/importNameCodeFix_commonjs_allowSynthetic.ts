/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: node
// @allowJs: true
// @checkJs: true
// @allowSyntheticDefaultImports: true

// @Filename: /test_module.js
//// const MY_EXPORTS = {}
//// module.exports = MY_EXPORTS;

// @Filename: /index.js
//// const newVar = {
////   any: MY_EXPORTS/**/,
//// }

goTo.marker("");
verify.importFixAtPosition([`const MY_EXPORTS = require("./test_module");

const newVar = {
  any: MY_EXPORTS,
}`]);
