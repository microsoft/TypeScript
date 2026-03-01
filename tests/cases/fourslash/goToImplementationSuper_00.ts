/// <reference path='fourslash.ts'/>

// Should go to super class declaration when invoked on a super call expression

//// class [|Foo|] {
////     constructor() {}
//// }
////
//// class Bar extends Foo {
////     constructor() {
////         su/*super_call*/per();
////     }
//// }

verify.baselineGoToImplementation("super_call");