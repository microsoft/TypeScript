/// <reference path='fourslash.ts'/>

// Should return implementations in a simple class

//// interface Foo {
////     hel/*declaration*/lo(): void;
////     okay?: number;
//// }
////
//// class Bar implements Foo {
////     [|hello() {}|]
////     public sure() {}
//// }
////
//// function whatever(a: Foo) {
////     a.he/*function_call*/llo();
//// }
////
//// whatever(new Bar());

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();

goTo.marker("declaration");
verify.allRangesAppearInImplementationList();