/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////[|function f({
////    a,
////    b,
////    c,
////}: any)|] {
////    b;
////    c;
////}

verify.codeFix({
    index: 0,
    description: "Remove unused declaration for: 'a'",
    newRangeContent:
`function f({
    b,
    c,
}: any)`
});
