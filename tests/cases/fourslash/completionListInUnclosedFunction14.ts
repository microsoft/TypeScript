/// <reference path="fourslash.ts" />

////interface MyType {
////}
////
////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string = "hello", c: typeof x = "hello") {
////        var v = (p: MyType) => /*1*/
////    }
////}

goTo.marker("1");

verify.memberListContains("foo");
verify.memberListContains("x");
verify.memberListContains("y");
verify.memberListContains("z");

verify.memberListContains("bar");
verify.memberListContains("a");
verify.memberListContains("b");
verify.memberListContains("c");

verify.memberListContains("v");
verify.memberListContains("p");