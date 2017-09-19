// @strict: true
/// <reference path='fourslash.ts' />
////type T = [|...number?|];
verify.rangeAfterCodeFix("(number | null)[]");
