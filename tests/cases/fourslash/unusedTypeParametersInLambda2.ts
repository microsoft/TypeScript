/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// var x : {
////     [|new <T, U>(a: T): void;|]
//// }

verify.codeFix({
    description: "Remove declaration for: 'U'",
    index: 0,
    newRangeContent: "new <T>(a: T): void;",
});
