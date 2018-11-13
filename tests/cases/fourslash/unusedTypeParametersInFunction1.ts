/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// [|function f1<T>() {}|]

verify.codeFix({
    description: "Remove type parameters",
    newRangeContent: "function f1() {}",
});
