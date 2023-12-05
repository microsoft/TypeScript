/// <reference path='fourslash.ts'/>

// Should handle calls made on enum name

//// enum [|Foo|] {
////     Foo1 = function initializer() { return 5 } (),
////     Foo2 = 6
//// }
////
//// Fo/*reference*/o;

verify.baselineGoToImplementation("reference");