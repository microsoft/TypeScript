/// <reference path="fourslash.ts" />

////interface Foo {
////    x: { a: number };
////}
////var aaa: Foo;
////aaa.x = { /*10*/

goTo.marker("10");
verify.completionListContains("a");
verify.completionListCount(1);


