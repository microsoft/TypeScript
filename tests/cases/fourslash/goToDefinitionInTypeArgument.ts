/// <reference path='fourslash.ts' />

////class /*fooDefinition*/Foo<T> { }
////
////class /*barDefinition*/Bar { }
////
////var x = new Fo/*fooReference*/o<Ba/*barReference*/r>();

verify.baselineGetDefinitionAtPosition("barReference", "fooReference");
