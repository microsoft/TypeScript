/// <reference path='fourslash.ts'/>

//// interface SuperFoo {
////     hello (): void;
//// }
////
//// interface Foo extends SuperFoo {}
////
//// class Bar implements Foo {
////      [|hello() {}|]
//// }
////
//// class OtherBar implements SuperFoo {
////      hello() {} // Only want references to Foo, even though the function is declared in SuperFoo
//// }
////
//// function createFoo(): Foo {
////     return { [|hello() {}|] };
//// }
////
//// var y: Foo = { [|hello() {}|] };
////
//// function (x: Foo) {
////     x.he/*function_call*/llo()
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();