/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
////[| import {Calculator, /*some comments*/ test, test2} from "./file1" |]

//// test();
//// test2();

// @Filename: file1.ts
//// export class Calculator {
////     handleChar() {}
//// }

//// export function test() {
////
//// }

//// export function test2() {
////
//// }

verify.rangeAfterCodeFix(`import {/*some comments*/ test, test2} from "./file1"`);

