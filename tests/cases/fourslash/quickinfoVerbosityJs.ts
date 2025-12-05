/// <reference path='fourslash.ts'/>

// @Filename: somefile.js
// @allowJs: true
//// /**
////  * @typedef {Object} SomeType
////  * @property {string} prop1
////  */

//// /** @type {SomeType} */
//// const a/*1*/ = {
////     prop1: 'value',
//// }

//// /**
////  * @typedef {Object} SomeType2/*2*/
////  * @property {number} prop2
////  * @property {SomeType} prop3
////  */

//// /** @type {SomeType[]} */
//// const ss = [{ prop1: 'value' }, { prop1: 'value' }];
//// const d = ss.map((s/*3*/) => s.prop1);

// expando

//// /** @param {SomeType} a
////  * @returns {SomeType}
////  */
//// function someFun/*4*/(a) {
////     return a;
//// }
//// someFun.what = 'what';

//// class SomeClass/*5*/ {
////     /** @type {SomeType2} */
////     b;
//// }

verify.baselineQuickInfo({
    1: [0, 1],
    2: [0, 1],
    3: [0, 1],
    4: [0, 1],
    5: [0, 1, 2],
});