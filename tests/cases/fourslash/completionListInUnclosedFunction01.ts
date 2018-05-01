/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    /*1*/
////

verify.completions({ at: "1", includes: ["foo", "x", "y", "z"] });
