/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
//// interface Fo/*1*/o {}
//// /*2*/class Bar implements Foo {}

goTo.marker('1');
goTo.implementation();
verify.caretAtMarker('2');