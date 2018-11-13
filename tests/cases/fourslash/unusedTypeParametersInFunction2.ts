/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// [|function f1<X, Y>(a: X) {a}|]

verify.codeFix({
    description: "Remove declaration for: 'Y'",
    index: 0,
    newRangeContent: "function f1<X>(a: X) {a}",
});
