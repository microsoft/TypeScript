/// <reference path='./fourslash.ts' />

// @Filename: /file1.ts
//// [|const a = 1;|]
//// [|function foo() {
////     console.log("testing");}|]
//// [|//This is a comment|]

verify.preparePasteEdits({
    copiedFromFile: "/file1.ts",
    copiedTextRange: test.ranges(),
    providePasteEdits: false,
})
