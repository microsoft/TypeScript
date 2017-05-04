/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string = /*1*/, c: typeof x = "hello"
////

goTo.marker("1");

verify.completionListContains("foo");
verify.completionListContains("x");
verify.completionListContains("y");
verify.completionListContains("z");

verify.completionListContains("bar");
verify.completionListContains("a");
verify.completionListContains("b");
verify.completionListContains("c"); // definitely questionable