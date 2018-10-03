/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for(var i = 0; ;) |]{
////
////     }
//// }

verify.codeFix({
    description: "Remove declaration for: 'i'",
    newRangeContent: "for(; ;) ",
});
