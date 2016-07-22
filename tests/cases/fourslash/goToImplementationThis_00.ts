/// <reference path='fourslash.ts'/>

//// [|class Bar extends Foo {
////     hello() {
////         thi/*this_call*/s.whatever();
////     }
////
////     whatever() {}
//// }|]

goTo.marker("this_call");
verify.allRangesAppearInImplementationList();