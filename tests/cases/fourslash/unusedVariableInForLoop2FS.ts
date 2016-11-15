/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for(var i = 0, j= 0; ;i++)|] {
////
////     }
//// }

verify.rangeAfterCodeFix("for(var i = 0; ;i++)");
