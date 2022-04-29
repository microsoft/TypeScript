/// <reference path='fourslash.ts' />

////// Outside the function expression
////declare var f1: (a: number) => void; /*1*/
////
////declare var f1: (b: number, b2: /*2*/) => void;

verify.completions(
    { marker: "1", excludes: "a" },
    { marker: "2", excludes: "b" },
);
edit.insert("typeof ");
verify.completions({ includes: "b" });
