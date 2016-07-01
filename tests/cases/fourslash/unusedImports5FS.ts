/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// import {Calculator, test/*0*/, test2/*1*/} from "./file1"
////
//// var x = new Calculator();
//// x.handleChar();
//// test();

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

verify.codeFixAtPosition(`
import {Calculator, test} from "./file1"

var x = new Calculator();
x.handleChar();
test();
`);