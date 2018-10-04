/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// [|function f1<X, Y, Z>(a: X) {a;var b:Z;b}|]

verify.codeFix({
    description: "Remove declaration for: 'Y'",
    index: 0,
    newRangeContent: "function f1<X, Z>(a: X) {a;var b:Z;b}",
});
