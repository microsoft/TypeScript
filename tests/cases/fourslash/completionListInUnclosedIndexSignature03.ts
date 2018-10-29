/// <reference path='fourslash.ts' />


////class C {
////    [foo: string]: { x: typeof /*1*/
////}

verify.completions({ marker: "1", includes: ["foo", "C"] });
