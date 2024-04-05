/// <reference path='fourslash.ts'/>

// Should not return references to parent interfaces even if the method is declared there

//// interface SuperFoo {
////     hello (): void;
//// }
////
//// interface Foo extends SuperFoo {
////     someOtherFunction(): void;
//// }
////
//// class Bar implements Foo {
////      [|hello|]() {}
////      someOtherFunction() {}
//// }
////
//// function createFoo(): Foo {
////     return {
////         [|hello|]() {},
////         someOtherFunction() {}
////     };
//// }
////
//// var y: Foo = {
////     [|hello|]() {},
////     someOtherFunction() {}
//// };
////
//// class FooLike implements SuperFoo {
////      hello() {}
////      someOtherFunction() {}
//// }
////
//// class NotRelatedToFoo {
////      hello() {}                // This case is equivalent to the last case, but is not returned because it does not share a common ancestor with Foo
////      someOtherFunction() {}
//// }
////
//// class NotFoo implements SuperFoo {
////      hello() {}                // We only want implementations of Foo, even though the function is declared in SuperFoo
//// }
////
//// function (x: Foo) {
////     x.he/*function_call*/llo()
//// }

verify.baselineGoToImplementation("function_call");