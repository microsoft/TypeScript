/// <reference path="fourslash.ts" />

////interface Foo {
////    x: { a: number };
////}
////var aaa: Foo;
////aaa = { /*9*/

goTo.marker("9");
verify.completionListContains("x");
verify.completionListCount(1);

