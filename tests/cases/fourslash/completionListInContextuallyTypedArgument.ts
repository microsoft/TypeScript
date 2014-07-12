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


goTo.marker("1");
verify.completionListContains('x1');
verify.completionListContains('y1');

goTo.marker("2");
verify.completionListContains('x1');
verify.completionListContains('y1');