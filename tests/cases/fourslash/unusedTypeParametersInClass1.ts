/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////[|class greeter<T> |] {
////}

verify.codeFix({
    description: "Remove declaration for: 'T'",
    newRangeContent: "class greeter ",
});
