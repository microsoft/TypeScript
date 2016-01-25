///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: Foo.js
/////** @/*1*/ */
////var v1;
////
/////** @p/*2*/ */
////var v2;
////
/////** @param /*3*/ */
////var v3;
////
/////** @param { n/*4*/ } bar */
////var v4;
////
/////** @type { n/*5*/ } */
////var v5;
////
////// @/*6*/
////var v6;
////
////// @pa/*7*/
////var v7;
////
/////** @return { n/*8*/ } */
////var v8;

goTo.marker('1');
verify.completionListContains("constructor");
verify.completionListContains("param");
verify.completionListContains("type");

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

