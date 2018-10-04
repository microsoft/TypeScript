/// <reference path='fourslash.ts'/>

////interface Foo {
////    x: "abc" | "def";
////}
////function bar(f: Foo) { };
////bar({x: "/**/"});

goTo.marker();
verify.completionListContains("abc");
verify.completionListContains("def");
verify.completionListCount(2);
