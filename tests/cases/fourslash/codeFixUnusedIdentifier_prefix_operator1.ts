/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function fn() {
////   let x = 1;
////   ++x;
////}

verify.codeFix({
    description: "Remove unused declaration for: 'x'",
    newFileContent:
`function fn() {
}`
});
