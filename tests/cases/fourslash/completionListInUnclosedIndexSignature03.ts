/// <reference path='fourslash.ts' />


////class C {
////    [foo: string]: { x: typeof /*1*/
////}

goTo.marker("1");
verify.completionListContains("foo");
verify.completionListContains("C");