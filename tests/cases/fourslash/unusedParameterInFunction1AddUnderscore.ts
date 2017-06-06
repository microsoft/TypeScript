/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter( x) |] {
////}

verify.rangeAfterCodeFix("greeter( _x)", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);
