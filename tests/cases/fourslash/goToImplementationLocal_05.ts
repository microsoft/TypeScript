/// <reference path='fourslash.ts'/>

// Should handle calls made the left hand side of a property access expression

//// class Bar {
////     public hello() {}
//// }
////
//// var [|someVar|] = new Bar();
//// someVa/*reference*/r.hello();

verify.baselineGoToImplementation("reference");
