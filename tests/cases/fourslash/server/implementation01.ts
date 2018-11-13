/// <reference path="../fourslash.ts"/>

////interface Fo/*1*/o {}
////class /*2*/Bar implements Foo {}

goTo.marker('1');
goTo.implementation();
verify.caretAtMarker('2');