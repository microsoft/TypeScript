/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// var x : {
////     [|new <T, U>(a: T): void;|]
//// }

verify.rangeAfterCodeFix("new <T>(a: T): void;", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
