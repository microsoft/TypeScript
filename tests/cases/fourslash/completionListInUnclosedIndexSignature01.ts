/// <reference path='fourslash.ts' />


////class C {
////    [foo: string]: typeof /*1*/
////}

verify.completions({ marker: "1", includes: ["foo", "C"] });
