/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|namespace greeter {
////    // do not remove comment
////    let a = 0;
////    // comment
////    let b = 0;
////    b;
////}|]

verify.codeFix({
    description: "Remove unused declaration for: 'a'",
    newRangeContent: `namespace greeter {
    // do not remove comment
    // comment
    let b = 0;
    b;
}`
});
