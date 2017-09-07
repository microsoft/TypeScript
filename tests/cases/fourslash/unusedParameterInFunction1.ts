/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter( x)|] {
////}

verify.rangeAfterCodeFix("greeter()", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
