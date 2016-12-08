/// <reference path='fourslash.ts' />

////enum Foo {
////    X, Y, '☆'
////}
////var x = Foo./**/

goTo.marker();
verify.completionListContains("X");
verify.completionListContains("Y");
verify.completionListCount(2);