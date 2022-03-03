/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function f1 () [|{
////    for (const elem of ["a", "b", "c"]) {
////        elem;
////        var x = 20;
////    }
////}|]
////

verify.codeFix({
    description: "Remove unused declaration for: 'x'",
    newRangeContent: `{
    for (const elem of ["a", "b", "c"]) {
        elem;
    }
}`
});
