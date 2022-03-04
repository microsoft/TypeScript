/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: noSuggestionWithoutDidYouMean.js
//// let a = {};
//// console.log(a.apple);
verify.noErrors()
verify.getSuggestionDiagnostics([])
