/// <reference path='fourslash.ts'/>

// Should go to the super class declaration when invoked on the super keyword in a property access expression

//// class [|Foo|] {
////     hello() {}
//// }
////
//// class Bar extends Foo {
////     hello() {
////         sup/*super_call*/er.hello();
////     }
//// }

verify.baselineGoToImplementation("super_call");