///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: Foo.js
//// /** @/*1*/ */
//// var v1;
////
//// /** @p/*2*/ */
//// var v2;
////
//// /** @param /*3*/ */
//// var v3;
////
//// /** @param { n/*4*/ } bar */
//// var v4;
////
//// /** @type { n/*5*/ } */
//// var v5;
////
//// // @/*6*/
//// var v6;
////
//// // @pa/*7*/
//// var v7;
////
//// /** @return { n/*8*/ } */
//// var v8;
////
//// /** /*9*/ */
////
//// /**
////  /*10*/
//// */
////
//// /**
////  * /*11*/
////  */
////
//// /**
////           /*12*/
////  */
////
//// /**
////   *       /*13*/
////   */
////
//// /**
////   * some comment /*14*/
////   */
////
//// /**
////   * @param /*15*/
////   */
////
//// /** @param /*16*/ */

verify.completions(
    { marker: ["1", "2"], includes: ["constructor", "param", "type", "method", "template"] },
    { marker: ["3", "15", "16"], exact: [] },
    { marker: ["4", "5", "8"], includes: "number" },
    { marker: ["6", "7", "14"], exact: undefined },
    { marker: ["9", "10", "11", "12", "13"], includes: ["@argument", "@returns"] },
);
