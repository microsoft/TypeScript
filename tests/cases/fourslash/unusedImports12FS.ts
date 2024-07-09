/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import f1, * as s from "./file1"; |]
//// f1(42);

// @Filename: file1.ts
//// export function f1(n: number){}
//// export function f2(s: string){};
//// export default f1;

verify.rangeAfterCodeFix('import f1 from "./file1";');