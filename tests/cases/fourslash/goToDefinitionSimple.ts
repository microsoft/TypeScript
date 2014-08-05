/// <reference path='fourslash.ts' />

// @Filename: Definition.ts
//// /*2*/class c { }

// @Filename: Consumption.ts
//// var n = new /*1*/c();

goTo.marker('1');
goTo.definition();
verify.caretAtMarker('2');
