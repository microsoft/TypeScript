/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for(var i = 0, j= 0; ;i++)|] {
////
////     }
//// }

verify.codeFix({
    description: "Remove unused declaration for: 'j'",
    newRangeContent: "for(var i = 0; ;i++)",
});
