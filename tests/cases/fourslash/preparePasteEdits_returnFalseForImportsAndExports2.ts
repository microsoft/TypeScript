/// <reference path='./fourslash.ts' />

// @allowJs: true
// @module: commonjs

// @Filename: /file1.ts
//// [|import [|t|] = require("./file2");|]
//// function add(a: number, b: number): number {
////    return a + b;
//// }
//// [|export = add;|]

// @Filename: /file2.ts
//// export const t = 1;

verify.preparePasteEdits({
    copiedFromFile: "/file1.ts",
    copiedTextRange: test.ranges(),
    providePasteEdits: false,
})