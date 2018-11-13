/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// class C1 {
////    [|f1<T extends number>()|] {}
//// }

verify.codeFix({
    description: "Remove type parameters",
    newRangeContent: "f1()",
});
