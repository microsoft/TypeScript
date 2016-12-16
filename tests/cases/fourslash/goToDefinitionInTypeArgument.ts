/// <reference path='fourslash.ts' />

/////*fooDefinition*/class Foo<T> { }
////
/////*barDefinition*/class Bar { }
////
////var x = new Fo/*fooReference*/o<Ba/*barReference*/r>();

verify.goToDefinitionForMarkers("bar", "foo");
