/// <reference path='fourslash.ts' />


////class C {
////    [foo: string]: typeof /*1*/
////}

goTo.marker("1");
verify.completionListContains("foo");
verify.completionListContains("C");