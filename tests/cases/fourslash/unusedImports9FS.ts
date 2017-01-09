/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [|import c = require('./file1')|]

// @Filename: file1.ts
//// export class Calculator {
////     handleChar() { }
//// }
////
//// export function test() {
////
//// }
////
//// export function test2() {
////
//// }

verify.rangeAfterCodeFix("");