/// <reference path="fourslash.ts" />

////interface MyType {
////}
////
////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string = "hello", c: typeof x = "hello") {
////        var v = (p: MyType) => y + /*1*/

verify.completions({ at: "1", includes: ["foo", "x", "y", "z", "bar", "a", "b", "c", "v", "p"] });
