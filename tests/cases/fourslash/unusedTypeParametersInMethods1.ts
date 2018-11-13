/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// class A {
////     [|public f1<X, Y, Z>(a: X)|] { a; var b: Z; b }
//// }

verify.codeFix({
    index: 0,
    description: "Remove declaration for: 'Y'",
    newRangeContent: "public f1<X, Z>(a: X)",
});
