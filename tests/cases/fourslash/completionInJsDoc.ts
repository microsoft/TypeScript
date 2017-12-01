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

goTo.marker('1');
verify.completionListContains("constructor");
verify.completionListContains("param");
verify.completionListContains("type");
verify.completionListContains("method");

goTo.marker('2');
verify.completionListContains("constructor");
verify.completionListContains("param");
verify.completionListContains("type");

goTo.marker('3');
verify.completionListIsEmpty();

goTo.marker('4');
verify.completionListContains('number');

goTo.marker('5');
verify.completionListContains('number');

goTo.marker('6');
verify.completionListIsEmpty();

goTo.marker('7');
verify.completionListIsEmpty();

goTo.marker('8');
verify.completionListContains('number');

goTo.marker('9');
verify.completionListContains("@argument");

goTo.marker('10');
verify.completionListContains("@returns");

goTo.marker('11');
verify.completionListContains("@argument");

goTo.marker('12');
verify.completionListContains("@constructor");

goTo.marker('13');
verify.completionListContains("@param");

goTo.marker('14');
verify.completionListIsEmpty();

goTo.marker('15');
verify.completionListIsEmpty();

goTo.marker('16');
verify.completionListIsEmpty();