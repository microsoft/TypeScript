/// <reference path='fourslash.ts' />

////// Outside the function
////declare function f1(a: number);/*1*/
////
////// inside the function
////declare function f2(b: number, b2 = /*2*/
////
////// Outside the function
////function f3(c: number) { }/*3*/
////
////// inside the function
////function f4(d: number) { /*4*/}

verify.completions(
    { marker: "1", excludes: "a" },
    { marker: "2", includes: "b" },
    { marker: "3", excludes: "c" },
    { marker: "4", includes: "d" },
);
