/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// /*2*/export class Foo {}

// @Filename: b.ts
//// /*bug*/import n = require('a');
//// var x = new /*1*/n.Foo();

goTo.marker('1');
goTo.definition();
// Bug 17164: getDefinitionAtPosition(...) on a module alias should return the original module, not the alias
// Correct: verify.caretAtMarker('2'); 
verify.caretAtMarker('bug');