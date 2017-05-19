///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: ref.d.ts
//// namespace Thing {
////     export interface Thung {
////         a: number;
////     ]
//// ]


// @Filename: Foo.js
////
//// /** @type {Array<number>} */
//// var v;
//// v[0]./*1*/
////
//// /** @type {{x: Array<Array<number>>}} */
//// var w;
//// w.x[0][0]./*2*/
////
//// /** @type {Array<Thing.Thung>} */
//// var x;
//// x[0].a./*3*/


goTo.marker('1');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");

goTo.marker('2');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");

goTo.marker('3');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
