/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// var x : {
////     [|new <T, U>(a: T): void;|]
//// }

verify.codeFix({
    description: "Remove declaration for: 'U'",
    newRangeContent: "new <T>(a: T): void;",
});
