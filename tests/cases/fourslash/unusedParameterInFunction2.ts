/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function [|greeter(x,y)|] {
////    x++;
////}

verify.codeFixAtPosition("greeter(x)");