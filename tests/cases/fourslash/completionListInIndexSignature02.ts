/// <reference path='fourslash.ts' />

////interface I<T> {
////    [x: /*1*/]: T;
////    [: /*2*/]: T
////}
////
////class C {
////    [a: /*3*/]: string;
////    [str: string/*4*/]: number;
////}
////
////type T = {
////    [xyz: /*5*/

const exact = completion.globalTypesPlus(["I", "C"]);
verify.completions(
    { marker: ["1", "2"], exact: ["T", ...exact] },
    { marker: ["3", "4", "5"], exact: completion.globalTypesPlus(["I", "C", "T"]) },
);
