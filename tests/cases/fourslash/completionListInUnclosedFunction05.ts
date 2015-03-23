/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string, c: typeof x = /*1*/
////}

goTo.marker("1");

verify.memberListContains("foo");
verify.memberListContains("x");
verify.memberListContains("y");
verify.memberListContains("z");

verify.memberListContains("bar");
verify.memberListContains("a");
verify.memberListContains("b");
verify.memberListContains("c"); // questionable