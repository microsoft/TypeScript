/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    /*1*/
////

goTo.marker("1");

verify.memberListContains("foo");
verify.memberListContains("x");
verify.memberListContains("y");
verify.memberListContains("z");