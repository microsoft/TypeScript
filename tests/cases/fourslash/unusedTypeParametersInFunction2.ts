/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// [|function f1<X, Y>(a: X) {a}|]

verify.codeFix({
    description: "Remove declaration for: 'Y'",
    newRangeContent: "function f1<X>(a: X) {a}",
});
