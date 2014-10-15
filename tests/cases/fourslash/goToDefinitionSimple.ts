/// <reference path='fourslash.ts' />

// @Filename: Definition.ts
//// /*2*/class c { }

// @Filename: Consumption.ts
//// var n = new /*1*/c();
//// var n = new c/*3*/();

goTo.marker('1');
goTo.definition();
verify.caretAtMarker('2');

goTo.marker('3');
goTo.definition();
verify.caretAtMarker('2');
