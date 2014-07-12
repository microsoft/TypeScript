/// <reference path='fourslash.ts' />

/////*fooDefinition*/class Foo<T> { }
////
/////*barDefinition*/class Bar { }
////
////var x = new Fo/*fooReference*/o<Ba/*barReference*/r>();


goTo.marker("barReference");
goTo.definition();
verify.caretAtMarker("barDefinition");

goTo.marker("fooReference");
goTo.definition();
verify.caretAtMarker("fooDefinition");
