/// <reference path='fourslash.ts' />

////enum Foo {
////    X, Y, '☆'
////}
////var x = Foo./**/

goTo.marker();
verify.memberListContains("X");
verify.memberListContains("Y");
verify.memberListCount(2);