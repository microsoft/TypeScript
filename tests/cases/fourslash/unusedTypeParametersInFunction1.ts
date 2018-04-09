/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// [|function f1<T>() {}|]

verify.codeFix({
    description: "Remove declaration for: 'T'",
    newRangeContent: "function f1() {}",
});
