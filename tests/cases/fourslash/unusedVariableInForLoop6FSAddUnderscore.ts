/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     for ([|const elem of |]["a", "b", "c"]) {
////
////     }
//// }

verify.codeFix({
    description: "Prefix 'elem' with an underscore.",
    index: 1,
    newRangeContent: "const _elem of"
});

