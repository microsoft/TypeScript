/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////[|function f(
////    a: number,
////    b: number,
////    c: number,
////)|] {
////    b;
////    c;
////}

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'a'",
    newRangeContent:
`function f(
    b: number,
    c: number,
)`
});
