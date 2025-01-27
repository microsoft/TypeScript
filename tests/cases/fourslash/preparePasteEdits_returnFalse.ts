/// <reference path='./fourslash.ts' />

// @Filename: /file1.ts
//// [|const a = 1;|]
//// [|function foo() {
////     console.log("testing");}|]
//// [|//This is a comment|]

// @Filename: /file2.ts
//// export const abc = 1;
verify.preparePasteEdits({
    copiedFromFile: "/file1.ts",
    copiedTextRange: test.ranges(),
    providePasteEdits: false,
})
