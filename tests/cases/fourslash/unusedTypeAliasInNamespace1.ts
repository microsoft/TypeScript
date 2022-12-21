/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    type hw = "Hello" |"world";
////    export type nw = "No" | "Way";
////}

verify.codeFix({
    description: "Remove unused declaration for: 'hw'",
    newFileContent: `namespace greeter {
    export type nw = "No" | "Way";
}`,
});
