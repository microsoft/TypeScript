/// <reference path='fourslash.ts' />

// @noUnusedLocals: true

////function f() {
////    let a = 1, b = 2, c = 3;
////}

verify.codeFix({
    description: "Remove variable statement",
    newFileContent:
`function f() {
}`,
});
