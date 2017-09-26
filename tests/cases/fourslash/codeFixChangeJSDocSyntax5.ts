// @strict: true
/// <reference path='fourslash.ts' />
//// var x: [|?number|] = 12;

verify.rangeAfterCodeFix("number | null", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 0);
