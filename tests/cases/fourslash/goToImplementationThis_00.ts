/// <reference path='fourslash.ts'/>

// Should go to class declaration when invoked on this keyword in property access expression

//// class [|Bar|] extends Foo {
////     hello() {
////         thi/*this_call*/s.whatever();
////     }
////
////     whatever() {}
//// }

verify.baselineGoToImplementation("this_call");
