/// <reference path="fourslash.ts" />

// @noUnusedLocals: true
// @noUnusedParameters: true

////[|function f({
////    a, b, /* comment related to c */
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
    a, /* comment related to c */
    c,
}: any)`
});
