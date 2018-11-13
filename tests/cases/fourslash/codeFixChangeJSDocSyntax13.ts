// @strict: true
/// <reference path='fourslash.ts' />
////class C {
////    p: [|*|] = 12
////}

verify.codeFix({
    description: "Change '*' to 'any'",
    errorCode: 8020,
    index: 0,
    newRangeContent: "any",
});
