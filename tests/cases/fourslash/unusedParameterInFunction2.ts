/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    x++;
////}

verify.rangeAfterCodeFix("greeter(x)", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);