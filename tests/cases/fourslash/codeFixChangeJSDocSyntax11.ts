// @strict: true
/// <reference path='fourslash.ts' />
//// var f = function f(x: [|string?|]) {
//// }
verify.rangeAfterCodeFix("string | null | undefined", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 1);
