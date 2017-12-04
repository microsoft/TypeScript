/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// [|interface I<T> {}|]

verify.codeFix({
    description: "Remove declaration for: 'T'",
    newRangeContent: "interface I {}",
});
