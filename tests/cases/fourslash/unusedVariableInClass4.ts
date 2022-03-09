/// <reference path='fourslash.ts' />

// @noUnusedLocals: false
////class greeter {
////    [|private greeting: string;|]
////}

verify.codeFix({
    description: "Remove unused declaration for: 'greeting'",
    newRangeContent: "",
});
