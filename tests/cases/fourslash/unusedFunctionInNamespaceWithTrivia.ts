/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   // Do not remove
////   /**
////    * JSDoc Comment
////    */
////   function function1() {
////   }/*1*/
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
    // Do not remove
 }`);
 