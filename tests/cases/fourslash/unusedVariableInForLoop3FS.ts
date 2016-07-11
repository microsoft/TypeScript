/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for(var i = 0, j= 0, k=0; ;i++, k++)|] {
////
////     }
//// }

verify.codeFixAtPosition("for(var i = 0, k=0; ;i++,k++)");