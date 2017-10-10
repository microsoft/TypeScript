/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y, Z> |] {
////    public a: X;
////    public b: Z;
////}

verify.codeFix({
    description: "Remove declaration for: 'Y'.",
    newRangeContent: "class greeter<X, Z> ",
});
