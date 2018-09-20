///<reference path="fourslash.ts" />
// @allowNonTsExtensions: true
// @Filename: Foo.js
////
//// * @param {never | {x: string}} p1
//// * @param {undefined | {y: number}} p2
//// * @param {null | {z: boolean}} p3
//// * @returns {void} nothing
//// */
////function f(p1, p2, p3) {
////    p1./*1*/
////    p2./*2*/
////    p3./*3*/
////}

goTo.marker('1');
verify.completionListContains("x");

goTo.marker('2');
verify.completionListContains("y");

goTo.marker('3');
verify.completionListContains("z");
