/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [|import {Calculator as calc, test as t1, test2 as t2} from "./file1"|]
////
//// var x = new calc();
//// x.handleChar();
//// t1();

// @Filename: file1.ts
//// export class Calculator {
////     handleChar() { }
//// }

//// export function test() {
////
//// }

//// export function test2() {
////
//// }

verify.rangeAfterCodeFix(`import {Calculator as calc, test as t1} from "./file1"`);