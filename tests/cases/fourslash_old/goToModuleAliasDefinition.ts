/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// /*2*/export class Foo {}

// @Filename: b.ts
//// /*3*/import n = require('a');
//// var x = new /*1*/n.Foo();

goTo.marker('1');
goTo.definition();
// Won't-fixed: Should go to '2' instead
verify.caretAtMarker('3');
