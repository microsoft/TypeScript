/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|public greeting1;
////    private greeting: string;|]
////}

verify.codeFix({
    description: "Remove declaration for: 'greeting'",
    index: 0,
    newRangeContent: "public greeting1;\n",
});
