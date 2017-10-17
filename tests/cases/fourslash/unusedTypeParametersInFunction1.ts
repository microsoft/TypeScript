/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|function f1<T>() {}|]

verify.codeFix({
    description: "Remove declaration for: 'T'.",
    newRangeContent: "function f1() {}",
});
