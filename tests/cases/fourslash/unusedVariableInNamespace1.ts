/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry";|]
////}

verify.codeFix({
    description: "Remove declaration for: 'a'",
    newRangeContent: "",
});
