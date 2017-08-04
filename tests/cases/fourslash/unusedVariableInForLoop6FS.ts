/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     for ([|const elem of|] ["a", "b", "c"]) {
////
////     }
//// }

verify.rangeAfterCodeFix("const {} of ", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

