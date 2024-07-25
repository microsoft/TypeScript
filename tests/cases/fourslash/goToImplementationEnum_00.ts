/// <reference path='fourslash.ts'/>

// Should handle calls made on members of an enum

//// enum Foo {
////     [|Foo1|] = function initializer() { return 5 } (),
////     Foo2 = 6
//// }
////
//// Foo.Fo/*reference*/o1;

verify.baselineGoToImplementation("reference");