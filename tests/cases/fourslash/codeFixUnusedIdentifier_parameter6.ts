/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////[|function f(
////    a: number,
////    b: number,
////
////
////    c: number,
////)|] {
////    a;
////    c;
////}

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'b'",
    newRangeContent:
`function f(
    a: number,
    

    c: number,
)`
});
