/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// [|interface I<T> {}|]

verify.codeFix({
    description: "Remove type parameters",
    newRangeContent: "interface I {}",
});
