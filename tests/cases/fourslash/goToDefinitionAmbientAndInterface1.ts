/// <reference path='fourslash.ts' />

////interface Foo {
////}
////
////declare var /*definition*/Foo: {
////    new(): Foo;
////}
////var foo = new /*current*/Foo();

goTo.marker("current");
goTo.definition();
verify.caretAtMarker("definition");