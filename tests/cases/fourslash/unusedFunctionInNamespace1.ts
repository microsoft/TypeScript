/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   // some legit comments
////   function function1() {
////   }/*1*/
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
   // some legit comments
}`);
