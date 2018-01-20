/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|private greeting: string;|]
////}

verify.codeFix({
    description: "Remove declaration for: 'greeting'",
    newRangeContent: "",
});
