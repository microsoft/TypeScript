/// <reference path='fourslash.ts' />

////// Outside the function expression
////var x1 = (a: number) => { }/*1*/;
////
////var x2 = (b: number) => {/*2*/ };

verify.completions(
    { marker: "1", excludes: "a" },
    { marker: "2", includes: "b" },
);
