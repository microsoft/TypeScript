// @strict: true
/// <reference path='fourslash.ts' />
//// var x = 12 as [|number?|];

verify.rangeAfterCodeFix("number | null", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 0);
