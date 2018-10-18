/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import {Calculator, test, test2} from "./file1" |]
////
//// var x = new Calculator();
//// x.handleChar();
//// test2();

// @Filename: file1.ts
//// export class Calculator {
////     handleChar() {}
//// }
////
//// export function test() {
////
//// }
////
//// export function test2() {
////
//// }

verify.rangeAfterCodeFix(`import {Calculator, test2} from "./file1"`);