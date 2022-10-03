/// <reference path='fourslash.ts' />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////
////function foo(a: (e: MyPoint) => string) { }
////foo((e) => {
////    e./*1*/
////} );
////
////class test {
////    constructor(a: (e: MyPoint) => string) { }
////}
////var t = new test((e) => {
////    e./*2*/
////} );

verify.completions({ marker: ["1", "2"], exact: ["x1", "y1"] });
