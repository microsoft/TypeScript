/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////[|class greeter<X, Y> |] {
////    public a: X;
////}

verify.codeFix({
    description: "Remove declaration for: 'Y'",
    index: 0,
    newRangeContent: "class greeter<X> ",
});
