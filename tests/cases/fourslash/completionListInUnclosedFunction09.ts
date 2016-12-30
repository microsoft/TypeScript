/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string = "hello", c: typeof x = "hello") {
////        var v = /*1*/
////}

goTo.marker("1");

verify.completionListContains("foo");
verify.completionListContains("x");
verify.completionListContains("y");
verify.completionListContains("z");

verify.completionListContains("bar");
verify.completionListContains("a");
verify.completionListContains("b");
verify.completionListContains("c");

verify.completionListContains("v"); // questionable