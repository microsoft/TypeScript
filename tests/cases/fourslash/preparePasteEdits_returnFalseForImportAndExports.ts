/// <reference path='./fourslash.ts' />

// @Filename: /file1.ts
//// import {[|abc|]} from "[|./file2|]";
//// import [|{q}|] from [|"./file3"|];
//// [|import * as a from "./file2";|]
//// 
//// const b = 1;
//// const c = 2;
//// [|export {[|b|], c} from "./file1";|]

// @Filename: /file2.ts
//// export const abc = 1;

// @Filename: /file3.ts
//// export const q = 1;
verify.preparePasteEdits({
    copiedFromFile: "/file1.ts",
    copiedTextRange: test.ranges(),
    providePasteEdits: false,
})
