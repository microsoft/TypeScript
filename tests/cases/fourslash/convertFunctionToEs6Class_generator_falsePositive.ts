/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: /a.js
////function* gen() {}
////gen.prototype.next = gen.prototype.next;
////gen.prototype.return = gen.prototype.return;

// Generator functions should not trigger the convert-to-class suggestion
verify.getSuggestionDiagnostics([]);