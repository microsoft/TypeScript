/// <reference path='fourslash.ts'/>

//// [|class Foo {
////     hello() {}
//// }|]
////
//// class Bar extends Foo {
////     hello() {
////         sup/*super_call*/er.hello();
////     }
//// }

goTo.marker("super_call");
verify.allRangesAppearInImplementationList();