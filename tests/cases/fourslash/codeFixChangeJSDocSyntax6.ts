// @strict: true
/// <reference path='fourslash.ts' />
//// var x: [|number?|] = 12;

verify.rangeAfterCodeFix("number | null | undefined", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 1);
