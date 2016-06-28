/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import n = require('e/*1*/');
////var x = new n.Foo();

// @Filename: a.ts
/////*2*/declare module "e" {
////    class Foo { }
////}

goTo.marker('1');
goTo.definition();
verify.caretAtMarker('2');