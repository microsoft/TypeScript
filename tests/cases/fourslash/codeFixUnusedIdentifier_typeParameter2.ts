/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f<
////    T1, T2,
////
////
////    T3,
////>(a: T1, b: T3) {}

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'T2'",
    newFileContent:
`function f<
    T1, 


    T3,
>(a: T1, b: T3) {}`
});
