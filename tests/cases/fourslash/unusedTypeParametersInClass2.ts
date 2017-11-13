/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y> |] {
////    public a: X;
////}

verify.codeFix({
    description: "Remove declaration for: 'Y'.",
    newRangeContent: "class greeter<X> ",
});
