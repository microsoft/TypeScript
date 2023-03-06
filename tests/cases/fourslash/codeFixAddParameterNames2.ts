/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////type Rest = ([|...number|]) => void;

verify.rangeAfterCodeFix("...arg0: number[]");
