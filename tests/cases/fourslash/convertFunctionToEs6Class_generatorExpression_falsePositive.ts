/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: /a.js
////const gen = function*() {};
////gen.prototype.next = gen.prototype.next;
////gen.prototype.return = gen.prototype.return;

// Generator function expressions should not trigger the convert-to-class suggestion
verify.getSuggestionDiagnostics([]);