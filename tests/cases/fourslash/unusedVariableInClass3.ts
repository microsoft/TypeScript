/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {[|
////    private X = function() {};
////|]}

verify.rangeAfterCodeFix("");
