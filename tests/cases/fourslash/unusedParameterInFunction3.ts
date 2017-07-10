/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    y++;
////}

verify.rangeAfterCodeFix("greeter(y)", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);