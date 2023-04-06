/// <reference path='fourslash.ts'/>

// Should handle property assignments within class declarations

//// interface Foo { hello: number }
////
//// class Bar implements Foo {
////     [|hello|] = 5 * 9;
//// }
////
//// function whatever(foo: Foo) {
////     foo.he/*reference*/llo;
//// }

verify.baselineGoToImplementation("reference");