/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|namespace greeter {
////    // Do not remove
////    /**
////     * JSDoc Comment
////     */
////    let a = 0;
////}|]

verify.codeFix({
    description: "Remove unused declaration for: 'a'",
    newRangeContent: `namespace greeter {
    // Do not remove
}`
});
