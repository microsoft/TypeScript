/// <reference path='./fourslash.ts' />

// @Filename: /file2.ts
////import { b } from './file1';
////export const a = 1;
//// [|function MyFunction() {}
//// namespace MyFunction {
////     export const value = b;
//// }|]
////const c = a + 20;
////const t = 9;

// @Filename: /file1.ts
////export const b = 2;

verify.preparePasteEdits({
    copiedFromFile: "/file2.ts",
    copiedTextRange: test.ranges(),
    providePasteEdits: true,
})
