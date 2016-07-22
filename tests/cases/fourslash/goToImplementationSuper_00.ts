/// <reference path='fourslash.ts'/>

//// [|class Foo {
////     constructor() {}
//// }|]
////
//// class Bar extends Foo {
////     constructor() {
////         su/*super_call*/per();
////     }
//// }

goTo.marker("super_call");
verify.allRangesAppearInImplementationList();