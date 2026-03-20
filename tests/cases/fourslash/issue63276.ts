/// <reference path='fourslash.ts' />
//
// Regression test for GH#63276: "Missing undefined for hover".
//
// @strict: true
// @exactOptionalPropertyTypes: false

//// type X/*1*/ = {
////   a?: A;
////   b?: A;
////   c?: A;
//// };
////
//// type A = {};

verify.quickInfoAt("1", `type X = {
    a?: A | undefined;
    b?: A | undefined;
    c?: A | undefined;
}`);

