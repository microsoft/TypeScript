/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   function function1() {
////   }/*1*/
//// } |]

verify.codeFixAtPosition(`namespace greeter {
}`);
