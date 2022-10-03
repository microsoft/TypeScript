/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.x = 0;

// No suggestion to convert to an ES6 module,
// since there are no es6 modules in this project and we don't have a high enough target.
verify.getSuggestionDiagnostics([]);
