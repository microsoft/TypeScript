/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////[|function f({
////    a, b,
////
////
////    c,
////}: any)|] {
////    a;
////    c;
////}

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'b'",
    newRangeContent:
`function f({
    a, 


    c,
}: any)`
});
