/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import * from 'e/*1*/';

// @Filename: a.ts
/////*2*/declare module "e" {
////    class Foo { }
////}

goTo.marker('1');
goTo.definition();
verify.caretAtMarker('2');