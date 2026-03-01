/// <reference path='./fourslash.ts' />

// @Filename: /file2.ts
//// import { T } from './file1';
////
//// [|function MyFunction(param: T): T {
////    type U = { value: T }
////    const localVariable: U = { value: param };
////    return localVariable.value;
//// }|]

// @Filename: /file1.ts
//// export type T = string;

verify.preparePasteEdits({
    copiedFromFile: "/file2.ts",
    copiedTextRange: test.ranges(),
    providePasteEdits: true
})
