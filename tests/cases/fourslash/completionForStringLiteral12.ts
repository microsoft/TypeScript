/// <reference path='fourslash.ts' />

////function foo(x: "bla"): void;
////function foo(x: "bla"): void;
////function foo(x: string) {}
////foo("/**/")

goTo.marker();
verify.completionListContains("bla");
verify.completionListCount(1);
