/// <reference path='fourslash.ts' />

/////**/
////class Foo {
////}

////var f/*A*/ff = new Foo();

goTo.marker('A');
verify.quickInfoIs('Foo');
