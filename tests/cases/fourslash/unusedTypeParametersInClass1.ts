/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////[|class greeter<T> |] {
////}

verify.codeFix({
    description: "Remove type parameters",
    newRangeContent: "class greeter ",
});
