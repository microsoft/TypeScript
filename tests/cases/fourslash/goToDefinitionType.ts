/// <reference path='fourslash.ts' />

/////var foo;
/////*type*/type foo = any;
////namespace foo {}
////var x: /*1*/foo;

goTo.marker("1");
goTo.definition();
verify.caretAtMarker("type");
