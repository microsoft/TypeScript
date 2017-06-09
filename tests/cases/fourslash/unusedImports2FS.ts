/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [|import {test} from "./file1"
//// import {Calculator} from "./file1"|]

//// var x = new Calculator();
//// x.handleChar();

// @Filename: file1.ts
//// export class Calculator {
////    handleChar() {}
//// }
//// export function test() {
////
//// }

verify.rangeAfterCodeFix(`import {Calculator} from "./file1"`, /*includeWhiteSpace*/ true, /*errorCode*/ undefined);
