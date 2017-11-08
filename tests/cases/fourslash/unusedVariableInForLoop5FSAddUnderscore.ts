/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for (const elem in ["a", "b", "c"]) |]{
////
////     }
//// }

verify.codeFix({
    description: "Prefix 'elem' with an underscore.",
    newRangeContent: 'for (const _elem in ["a", "b", "c"])'
});
