/// <reference path='fourslash.ts' />

// @lib: es5

////interface I<T> {
////    [/*1*/]: T;
////    [/*2*/]: T;
////}
////
////class C {
////    [/*3*/]: string;
////    [str/*4*/: string]: number;
////}
////
////type T = {
////    [x/*5*/yz: number]: boolean;
////    [/*6*/

const exact = completion.globalsPlus(["C"]);
verify.completions(
    { marker: ["1", "2", "3", "6"], exact, isNewIdentifierLocation: true },
    { marker: "4", unsorted: ["str", ...exact], isNewIdentifierLocation: true },
    { marker: "5", unsorted: ["xyz", ...exact], isNewIdentifierLocation: true },
);
