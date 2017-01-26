/// <reference path="fourslash.ts" />

////interface MyType {
////}
////
////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string = "hello", c: typeof x = "hello") {
////        var v = (x: /*1*/);
////    }
////}

goTo.marker("1");

verify.completionListContains("MyType");