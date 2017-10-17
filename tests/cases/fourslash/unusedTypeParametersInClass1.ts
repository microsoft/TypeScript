/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<T> |] {
////}

verify.codeFix({
    description: "Remove declaration for: 'T'.",
    newRangeContent: "class greeter ",
});
