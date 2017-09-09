// @strict: true
/// <reference path='fourslash.ts' />
//// function f(x: [|number?|]) {
//// }
verify.rangeAfterCodeFix("number | null", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 0);
