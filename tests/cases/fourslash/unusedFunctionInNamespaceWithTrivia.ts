/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   /**
////    * JSDoc Comment
////    */
////   function function1() {
////   }/*1*/
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
 }`);
 