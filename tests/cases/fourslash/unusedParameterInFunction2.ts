/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    x++;
////}

verify.rangeAfterCodeFix("greeter(x)");