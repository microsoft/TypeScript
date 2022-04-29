/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|private greeting: string;|]
////}

verify.codeFix({
    description: "Remove unused declaration for: 'greeting'",
    newRangeContent: "",
});
