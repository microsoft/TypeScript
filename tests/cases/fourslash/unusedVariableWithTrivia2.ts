/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|namespace greeter {
////    /**
////     * JSDoc Comment
////     */
////    let a = 0;
////}|]

verify.codeFix({
    description: "Remove unused declaration for: 'a'",
    newRangeContent: `namespace greeter {
}`
});
