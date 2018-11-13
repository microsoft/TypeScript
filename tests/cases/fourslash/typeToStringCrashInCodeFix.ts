/// <reference path="fourslash.ts" />

// @noImplicitAny: true
//// function f([|y |], z = { p: y[

verify.rangeAfterCodeFix("y: { [x: string]: any; }",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
