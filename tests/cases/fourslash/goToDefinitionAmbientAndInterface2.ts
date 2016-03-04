/// <reference path='fourslash.ts' />

////declare var /*definition*/Foo: {
////    new(): Foo;
////}
////var foo = new /*current*/Foo();
////interface Foo {
////}
////

goTo.marker("current");
goTo.definition();
verify.caretAtMarker("definition");