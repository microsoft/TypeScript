// @strict: true
/// <reference path='fourslash.ts' />
////type T = [|...number?|];
verify.rangeAfterCodeFix("number[] | null", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 0);
