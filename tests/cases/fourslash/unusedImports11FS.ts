/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import f1, * as s from "./file1"; |]
//// s.f2('hello');

// @Filename: file1.ts
//// export var v1;
//// export function f1(n: number){}
//// export function f2(s: string){};
//// export default f1;

verify.rangeAfterCodeFix('import * as s from "./file1";');