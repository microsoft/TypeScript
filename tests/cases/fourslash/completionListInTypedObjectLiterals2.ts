/// <reference path="fourslash.ts" />

////interface Foo {
////    x: { a: number };
////}
////var aaa: Foo;
////aaa = { /*9*/

goTo.marker("9");
verify.memberListContains("x");
verify.memberListCount(1);

