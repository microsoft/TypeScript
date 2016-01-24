/// <reference path='fourslash.ts'/>

// @Filename: a.ts
/////*2*/declare module "external/*1*/" {
////    class Foo { }
////}

goTo.marker('1');
goTo.definition();
verify.caretAtMarker('2');