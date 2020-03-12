/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry";|]
////}

verify.codeFix({
    description: "Remove unused declaration for: 'a'",
    newRangeContent: "",
});
