/// <reference path="../fourslash.ts"/>

// @Filename: b.ts
////import n = require('./a');
////var x/*1*/ = new n.Foo();

// @Filename: a.ts
//// /*2*/export class Foo {}

goTo.marker('1');
goTo.type();
verify.caretAtMarker('2');