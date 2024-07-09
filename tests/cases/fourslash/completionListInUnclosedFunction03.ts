/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    function bar(a: number, b: string, c: typeof /*1*/
////}

verify.completions({ marker: "1", includes: ["foo", "x", "y", "z", "bar", "a", "b"]})
