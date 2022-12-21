/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for(var i = 0, j= 0, k=0; ;j++, k++) |]{
////
////     }
//// }

verify.codeFix({
    description: "Remove unused declaration for: 'i'",
    newRangeContent: "for(var j= 0, k=0; ;j++, k++) ",
});
