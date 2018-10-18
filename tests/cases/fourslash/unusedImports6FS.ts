/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import d from "./file1" |]

// @Filename: file1.ts
//// export class Calculator {
////     handleChar() { }
//// }

//// export function test() {
////
//// }

//// export default function test2() {
////
//// }

verify.rangeAfterCodeFix('');