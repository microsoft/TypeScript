/// <reference path="fourslash.ts" />

////function foo(x: string, y: number, z: boolean) {
////    /*1*/
////

verify.completions({ marker: "1", includes: ["foo", "x", "y", "z"] });
