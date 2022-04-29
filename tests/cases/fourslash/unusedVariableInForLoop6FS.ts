/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     for ([|const elem of|] ["a", "b", "c"]) {
////
////     }
//// }

verify.codeFix({
    description: "Remove unused declaration for: 'elem'",
    index: 0,
    newRangeContent: "const {} of",
});
