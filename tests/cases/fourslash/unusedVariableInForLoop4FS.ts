/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for(var i = 0, j= 0, k=0; ;j++, k++) |]{
////
////     }
//// }

verify.codeFixAtPosition("for(var j = 0, k=0; ;j++,k++)");
